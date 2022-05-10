import * as d3 from "d3"
import { SimulationLinkDatum, SimulationNodeDatum } from "d3"
import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { addEndTraversalListener } from "../events/EndTraversalEvent"
import { NewPageEvent } from "../events/NewPageEvent"
import hslToRgb from "../functions/hslToRgb"
import "./graph.css"

const maxNodeSize = 18
const minNodeSize = 4
const depthSteps = 3

const hueShiftPerNode = 45

interface PageNode extends SimulationNodeDatum {
    id: string
    label: string
    depth: number
    url?: string
}

type PageLink = SimulationLinkDatum<PageNode> & {
    strength: number
}

type AnySelection = d3.Selection<any, any, any, any>

const nodes: PageNode[] = [
    {
        id: "mammal",
        label: "Mammals",
        depth: 1,
        url: "https://lukasfischer.me"
    },
    { id: "dog", label: "Dogs", depth: 1, url: "https://lukasfischer.me" },
    { id: "cat", label: "Cats", depth: 1, url: "https://lukasfischer.me" },
    { id: "fox", label: "Foxes", depth: 4, url: "https://lukasfischer.me" },
    { id: "elk", label: "Elk", depth: 1, url: "https://lukasfischer.me" },
    {
        id: "insect",
        label: "Insects",
        depth: 1,
        url: "https://lukasfischer.me"
    },
    { id: "ant", label: "Ants", depth: 1, url: "https://lukasfischer.me" },
    { id: "bee", label: "Bees", depth: 1, url: "https://lukasfischer.me" },
    { id: "fish", label: "Fish", depth: 1, url: "https://lukasfischer.me" },
    { id: "carp", label: "Carp", depth: 1, url: "https://lukasfischer.me" },
    { id: "pike", label: "Pikes", depth: 1, url: "https://lukasfischer.me" }
]

//@ts-ignore
window.nodes = nodes

const links: PageLink[] = [
    { target: "mammal", source: "dog", strength: 0.7 },
    { target: "mammal", source: "cat", strength: 0.7 },
    { target: "mammal", source: "fox", strength: 0.7 },
    { target: "mammal", source: "elk", strength: 0.7 },
    { target: "insect", source: "ant", strength: 0.7 },
    { target: "insect", source: "bee", strength: 0.7 },
    { target: "fish", source: "carp", strength: 0.7 },
    { target: "fish", source: "pike", strength: 0.7 },
    { target: "cat", source: "elk", strength: 0.1 },
    { target: "carp", source: "ant", strength: 0.1 },
    { target: "elk", source: "bee", strength: 0.1 },
    { target: "fox", source: "ant", strength: 0.1 },
    { target: "pike", source: "dog", strength: 0.1 }
]

const hoverLabels: PageNode[] = []

//@ts-ignore
window.hoverLabels = hoverLabels

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

    const zoom = d3.zoom<any, any>().scaleExtent([0.1, 40]).on("zoom", zoomed)

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

    const g = svg.append("g")

    function zoomed({ transform }: { transform: string }) {
        g.attr("transform", transform)
    }

    svg.call(zoom).call(
        zoom.transform,
        d3.zoomIdentity.translate(window.innerWidth / 2, window.innerHeight / 2)
    )

    let linkElements: AnySelection = g
        .append("g")
        .attr("id", "links")
        .attr("stroke-width", 2)
        .attr("stroke", "#8f8f8f")
        .selectAll("line")

    let textElements: AnySelection = g
        .append("g")
        .attr("id", "text-labels")
        .selectAll("text")

    let nodeElements: AnySelection = g
        .append("g")
        .attr("id", "nodes")
        .selectAll("circle")

    let hoverLabelElements: AnySelection = g
        .append("g")
        .attr("id", "hover-labels")
        .selectAll("g")

    const simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody().strength(-350))
        .force("center", d3.forceCenter(0, 0))

    simulation.nodes(nodes)

    simulation.force(
        "link",
        d3
            .forceLink<PageNode, PageLink>(links)
            .id((node) => node.id)
            .strength((link: any) => link.strength * 0.2)
    )

    simulation.on("tick", () => {
        nodeElements
            .attr("cx", (node: PageNode) => node.x ?? 0)
            .attr("cy", (node: PageNode) => node.y ?? 0)

        textElements
            .attr("x", (node: PageNode) => node.x ?? 0)
            .attr("y", (node: PageNode) => node.y ?? 0)

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

    function drawLabel(selection: AnySelection, color = "white"): AnySelection {
        return selection
            .append("text")
            .text((node: PageNode) => node.label)
            .attr("fill", color)
            .attr("font-family", "Source Sans Pro")
            .attr("style", "pointer-events:none;")
            .attr("font-size", 25)
            .attr("dx", 35)
            .attr("dy", 11)
    }

    function drawNode(
        selection: AnySelection,
        ignoreEvents = false
    ): AnySelection {
        const nodeSelection = selection
            .append("circle")
            .attr("r", 25)
            .attr("fill", getNodeColor)
            .attr("stroke", getStrokeColor)
            .attr("stroke-width", 4)

        if (ignoreEvents)
            return nodeSelection.attr("style", "pointer-events:none;")
        else return nodeSelection
    }

    function drawLabelTag(selection: AnySelection) {
        const factor = 11.56812

        const dString = (node: PageNode) => {
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
            .attr("transform", `translate(0, ${0.355 * factor})`)
            .attr("fill", "#0d0d0d")
            .attr("style", "pointer-events:none")

        return selection
            .append("path")
            .attr("d", dString)
            .attr("fill", "#e2e2e2")
            .attr("style", "pointer-events:none")
    }

    const restart = () => {
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
            .merge(textElements)

        // Update and restart the simulation.
        simulation.nodes(nodes)
        //@ts-ignore
        simulation.force("link").links(links)
        simulation.alpha(1).restart()
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

    const handleNewPage = (event: NewPageEvent) => {
        const detail = event.detail

        const nodeSize = Math.max(
            minNodeSize,
            maxNodeSize - detail.depth * depthSteps
        )

        //add node
        nodes.push({
            id: detail.id,
            label: detail.title,
            depth: detail.depth,
            x: 0, //TODO find position
            y: 0,
            url: detail.url
        })

        if (detail.parentId) {
            links.push({
                source: detail.parentId,
                target: detail.id,
                strength: 1
            })
        }

        restart()
    }

    addBeginTraversalListener(() => {
        // clear the graph
        nodes.length = 0
        links.length = 0
        hoverLabels.length = 0
        restart()
        recreateLabels()
    })

    addEndTraversalListener(() => {})

    document.addEventListener("newPage", handleNewPage as any)
}

export default initGraph
