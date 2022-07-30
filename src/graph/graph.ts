import * as d3 from "d3"
import { SimulationLinkDatum, SimulationNodeDatum } from "d3"
import { dispatchGenerateImageDone } from "../events/GenerateImageDoneEvent"
import { addGenerateImageListener } from "../events/GenerateImageEvent"
import { addNewPageListener, NewPageEvent } from "../events/NewPageEvent"
import { addOptionsChangeListener } from "../events/OptionsChangeEvent"
import { addResetViewListener } from "../events/ResetViewEvent"
import { addTraversalBeginListener } from "../events/TraversalBeginEvent"
import { addTraversalEndListener } from "../events/TraversalEndEvent"
import exportGraphAsImage from "../functions/exportGraphAsImage"
import hslToRgb from "../functions/hslToRgb"
import "./graph.css"

const maxNodeSize = 42
const minNodeSize = 20
const depthStep = 7

const hueShiftPerNode = 45

export interface PageNode extends SimulationNodeDatum {
    id: string
    label: string
    depth: number
    url?: string
}

type PageLink = SimulationLinkDatum<PageNode>

type AnySelection = d3.Selection<any, any, any, any>

type StoredGraph = {
    nodes: PageNode[]
    links: PageLink[]
    alpha: number
}

const nodes: PageNode[] = []

//@ts-ignore
window.nodes = nodes

const links: PageLink[] = []

//@ts-ignore
window.links = links

const hoverLabels: PageNode[] = []

//@ts-ignore
window.hoverLabels = hoverLabels

const options = {
    labelsEnabled: true
}

const getNodeColor = (node: PageNode) => {
    const hue = node.depth * hueShiftPerNode
    const color = hslToRgb((hue % 360) / 360, 1, 0.5)
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

const getStrokeColor = (node: PageNode) => {
    const hue = node.depth * hueShiftPerNode
    const color = hslToRgb((hue % 360) / 360, 1, 0.35)
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

const getNodeRadius = (node: PageNode) => {
    return Math.max(minNodeSize, maxNodeSize - node.depth * depthStep)
}

const initGraph = () => {
    const svg = d3.select("#graph")

    const setSize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        svg.attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
    }

    d3.select(window).on("resize", setSize)
    setSize()

    const zoom = d3.zoom<any, any>().scaleExtent([0.02, 40]).on("zoom", zoomed)

    const zoomGroup = svg.append("g").attr("id", "zoom-group")

    function zoomed({ transform }: { transform: string }) {
        zoomGroup.attr("transform", transform)
    }

    svg.call(zoom).call(
        zoom.transform,
        d3.zoomIdentity.translate(window.innerWidth / 2, window.innerHeight / 2)
    )

    let linkElements: AnySelection = zoomGroup
        .append("g")
        .attr("id", "links")
        .attr("stroke-width", 2)
        .attr("stroke", "#8f8f8f")
        .selectAll("line")

    let textElements: AnySelection = zoomGroup
        .append("g")
        .attr("id", "text-labels")
        .selectAll("text")

    let nodeElements: AnySelection = zoomGroup
        .append("g")
        .attr("id", "nodes")
        .selectAll("circle")

    let hoverLabelElements: AnySelection = zoomGroup
        .append("g")
        .attr("id", "hover-labels")
        .selectAll("g")

    const simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(0, 0))
        .force(
            "collision",
            d3.forceCollide((node: PageNode) => getNodeRadius(node) + 5)
        )

    simulation.force(
        "link",
        d3
            .forceLink<PageNode, PageLink>(links)
            .id((node) => node.id)
            .distance(100)
            .strength(0.2)
    )

    /**
     * Debug function
     */
    //@ts-expect-error
    window.resetAlpha = () => {
        simulation.alpha(1).restart()
    }

    /**
     * Debug function
     */
    //@ts-expect-error
    window.resetPosition = () => {
        nodes.forEach((node) => {
            node.x = Math.random() * 2000 - 1000
            node.y = Math.random() * 2000 - 1000
        })
        simulation.alpha(1).restart()
    }

    //import if existing in LS
    const storedGraphLocalStorage = localStorage.getItem("stored-graph")
    if (storedGraphLocalStorage) {
        const storedGraph = JSON.parse(storedGraphLocalStorage) as StoredGraph
        nodes.length = 0
        nodes.push(...storedGraph.nodes)
        links.length = 0
        links.push(...storedGraph.links)
        simulation.alpha(storedGraph.alpha)
    }
    //end import

    simulation.on("tick", () => {
        nodeElements
            .attr("cx", (node: any) => node.x)
            .attr("cy", (node: any) => node.y)

        textElements
            .attr("x", (node: any) => node.x)
            .attr("y", (node: any) => node.y)

        linkElements
            .attr("x1", (link: any) => link.source.x)
            .attr("y1", (link: any) => link.source.y)
            .attr("x2", (link: any) => link.target.x)
            .attr("y2", (link: any) => link.target.y)

        hoverLabelElements.attr(
            "transform",
            (node: PageNode) => `translate(${node.x}, ${node.y})`
        )
    })

    simulation.on("end", () => {
        console.log("simulation ended")
        storeInLocalStorage()
    })

    function drawLabel(selection: AnySelection, color = "white"): AnySelection {
        return selection
            .append("text")
            .text((node: PageNode) => node.label)
            .attr("fill", color)
            .attr("font-family", "Source Sans Pro")
            .attr("style", "pointer-events:none;")
            .attr("font-size", 25)
            .attr("dx", (node: PageNode) => getNodeRadius(node) + 10)
            .attr("dy", 11)
    }

    function drawNode(
        selection: AnySelection,
        ignoreEvents = false
    ): AnySelection {
        function handleDragStart(event: any, d: PageNode) {
            if (!event.active) simulation.alphaTarget(1).restart()
            d.fx = d.x
            d.fy = d.y
        }

        function handleDrag(event: any, d: PageNode) {
            d.fx = event.x
            d.fy = event.y
        }

        function handleDragEnd(event: any, d: PageNode) {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = undefined
            d.fy = undefined
        }

        const drag = d3
            .drag<any, PageNode>()
            .on("start", handleDragStart)
            .on("drag", handleDrag)
            .on("end", handleDragEnd)

        const nodeSelection = selection
            .append("circle")
            .attr("r", getNodeRadius)
            .attr("fill", getNodeColor)
            .attr("stroke", getStrokeColor)
            .attr("stroke-width", 4)
            .call(drag as any)

        if (ignoreEvents)
            return nodeSelection.attr("style", "pointer-events:none;")
        else return nodeSelection
    }

    function drawLabelTag(selection: AnySelection) {
        const multiplier = 12

        const dString = (node: PageNode) => {
            const factor = multiplier * (getNodeRadius(node) / 25)
            const label = d3
                .select(`#label-${node.id}`)
                .node() as SVGTextElement | null

            const labelWidth = label?.getBBox().width ?? 0

            const horizontal = 4.776 * factor + labelWidth + 0.791 * factor

            return (
                `m ${-1.718 * factor},${-2.821 * factor} ` +
                `h ${horizontal} ` +
                `v ${5.62 * factor} ` +
                `h ${-horizontal} ` +
                `L ${-2.838 * factor},${1.786 * factor} ` +
                `L ${-2.838 * factor},${-1.701 * factor} ` +
                "z"
            )
        }

        selection
            .append("path")
            .attr("d", dString)
            .attr("transform", (node: PageNode) => {
                const factor = multiplier * (getNodeRadius(node) / 25)
                return `translate(0, ${0.355 * factor})`
            })
            .attr("fill", "#0d0d0d")
            .attr("style", "pointer-events:none")

        return selection
            .append("path")
            .attr("d", dString)
            .attr("fill", "#e2e2e2")
            .attr("style", "pointer-events:none")
    }

    const restart = (resetAlpha = false) => {
        nodeElements = nodeElements.data(nodes)
        nodeElements.exit().remove()
        nodeElements = drawNode(nodeElements.enter())
            .on("mouseenter", function (event: any, data: PageNode) {
                document.body.style.cursor = "pointer"
                hoverLabels.push(data)
                recreateLabels()
            })
            .on("mouseout", function (event: any, node: PageNode) {
                document.body.style.cursor = "auto"
                hoverLabels.splice(hoverLabels.indexOf(node), 1)
                recreateLabels()
            })
            .on("click", function (event: any, data: PageNode) {
                if (!data.url) return
                window.open(data.url, "_blank", "noopener noreferrer")
            })
            .merge(nodeElements)

        linkElements = linkElements.data(links)
        linkElements.exit().remove()
        linkElements = linkElements.enter().append("line").merge(linkElements)

        textElements = textElements.data(nodes)
        textElements.exit().remove()
        textElements = drawLabel(textElements.enter())
            .attr("id", (node: PageNode) => `label-${node.id}`)
            .merge(textElements) // update selection
            .attr("fill", options.labelsEnabled ? "white" : "transparent")

        // Update and restart the simulation.
        simulation.nodes(nodes)
        //@ts-ignore
        simulation.force("link").links(links)
        if (resetAlpha) simulation.alpha(1)
        simulation.restart()
    }

    function recreateLabels() {
        hoverLabelElements = hoverLabelElements.data(hoverLabels)
        hoverLabelElements.exit().remove()
        hoverLabelElements = hoverLabelElements
            .enter()
            .append("g")
            .attr("id", (node: PageNode) => `hover-label-${node.id}`)
            .attr(
                "transform",
                (node: PageNode) => `translate(${node.x}, ${node.y})`
            )
            .merge(hoverLabelElements)

        hoverLabelElements.call(drawLabelTag)

        hoverLabelElements.call(drawLabel, "black")

        hoverLabelElements.call(drawNode, true)
    }

    restart()
    recreateLabels()

    function resetView() {
        zoom.translateTo(svg, 0, 0)
        zoom.scaleTo(svg, 1)
    }

    addNewPageListener((event: NewPageEvent) => {
        const detail = event.detail

        let x = 0
        let y = 0
        if (detail.parentId) {
            const parentNode = nodes.find((node) => node.id === detail.parentId)
            x = parentNode?.x ?? 0
            y = parentNode?.y ?? 0

            x += Math.random() * 200 - 100
            y += Math.random() * 200 - 100
        }

        nodes.push({
            id: detail.id,
            label: detail.title,
            depth: detail.depth,
            x: x,
            y: y,
            url: detail.url
        })

        if (detail.parentId) {
            links.push({
                source: detail.parentId,
                target: detail.id
            })
        }

        restart(true)
    })

    addTraversalBeginListener(() => {
        // clear the graph
        nodes.length = 0
        links.length = 0
        hoverLabels.length = 0
        restart()
        recreateLabels()
        resetView()
    })

    addTraversalEndListener(() => {
        storeInLocalStorage()
    })

    addResetViewListener(() => {
        resetView()
    })

    addOptionsChangeListener((event) => {
        const { labelsEnabled } = event.detail

        if (labelsEnabled !== undefined) {
            options.labelsEnabled = labelsEnabled
            restart()
        }
    })

    addGenerateImageListener(async (event) => {
        const scale = event.detail.scale

        try {
            await exportGraphAsImage(
                svg.node() as HTMLOrSVGImageElement,
                nodes,
                scale,
                25
            )
            dispatchGenerateImageDone({})
        } catch (error) {
            if (error === "resultImageTooBig") {
                dispatchGenerateImageDone({ error: "imageScaleTooBig" })
            }
        }
    })

    function storeInLocalStorage() {
        if (nodes.length === 0) {
            return
        }

        const copiedLinks = (structuredClone(links) as PageLink[]).map(
            (link) => {
                return {
                    ...link,
                    source: (link.source as PageNode).id,
                    target: (link.target as PageNode).id
                }
            }
        ) as PageLink[]
        const graphToStore: StoredGraph = {
            nodes: nodes,
            links: copiedLinks,
            alpha: simulation.alpha()
        }
        localStorage.setItem("stored-graph", JSON.stringify(graphToStore))
    }
}

export default initGraph
export { getNodeRadius }
