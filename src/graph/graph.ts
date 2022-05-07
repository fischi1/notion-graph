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
}

type PageLink = SimulationLinkDatum<PageNode> & {
    strength: number
}

const nodes: PageNode[] = [
    { id: "mammal", label: "Mammals", depth: 1 },
    { id: "dog", label: "Dogs", depth: 1 },
    { id: "cat", label: "Cats", depth: 1 },
    { id: "fox", label: "Foxes", depth: 4 },
    { id: "elk", label: "Elk", depth: 1 },
    { id: "insect", label: "Insects", depth: 1 },
    { id: "ant", label: "Ants", depth: 1 },
    { id: "bee", label: "Bees", depth: 1 },
    { id: "fish", label: "Fish", depth: 1 },
    { id: "carp", label: "Carp", depth: 1 },
    { id: "pike", label: "Pikes", depth: 1 }
]

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

const initGraph = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const svg = d3
        .select("#graph")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)

    d3.select(window).on("resize", () => {
        const width = window.innerWidth
        const height = window.innerHeight
        svg.attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
    })

    const zoom = d3.zoom<any, any>().scaleExtent([0.1, 40]).on("zoom", zoomed)

    svg.call(zoom)

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

    function zoomed({ transform }: any) {
        g.attr("transform", transform)
    }

    let linkElements: any = g
        .append("g")
        .attr("stroke-width", 2)
        .attr("stroke", "#8f8f8f")
        .selectAll("line")

    let nodeElements: any = g.append("g").selectAll("circle")

    let textElements: any = g.append("g").selectAll("text")

    const simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody().strength(-350))
        .force("center", d3.forceCenter(width / 2, height / 2))

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
    })

    const restart = () => {
        console.log("restart")

        nodeElements = nodeElements.data(nodes)
        nodeElements.exit().remove()
        nodeElements = nodeElements
            .enter()
            .append("circle")
            .attr("r", 25)
            .attr("fill", getNodeColor)
            .attr("stroke", getStrokeColor)
            .attr("stroke-width", "4")
            .on("mouseover", function (event: any) {
                const circle = d3.select(event.srcElement)
                circle.attr("fill", "green")
            })
            .on("mouseout", function (event: any) {
                const circle = d3.select<any, any>(event.srcElement)
                circle.attr("fill", getNodeColor)
            })
            .merge(nodeElements)

        linkElements = linkElements.data(links)
        linkElements.exit().remove()
        linkElements = linkElements.enter().append("line").merge(linkElements)

        textElements = textElements.data(nodes)
        textElements.exit().remove()
        textElements = textElements
            .enter()
            .append("text")
            .text((node: PageNode) => node.label)
            .attr("fill", "#e6e6e6")
            .attr("font-family", "Source Sans Pro")
            .attr("font-size", 25)
            .attr("dx", 35)
            .attr("dy", 11)
            .merge(textElements)

        // Update and restart the simulation.
        simulation.nodes(nodes)
        //@ts-ignore
        simulation.force("link").links(links)
        simulation.alpha(1).restart()
    }

    restart()

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
            x: width / 2,
            y: height / 2
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
        nodes.length = 0
        links.length = 0
        restart()
    })

    addEndTraversalListener(() => {})

    document.addEventListener("newPage", handleNewPage as any)
}

export default initGraph
