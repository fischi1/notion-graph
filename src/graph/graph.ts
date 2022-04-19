import * as d3 from "d3"
import { SimulationLinkDatum, SimulationNodeDatum } from "d3"
import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { addEndTraversalListener } from "../events/EndTraversalEvent"
import { NewPageEvent } from "../events/NewPageEvent"
import hslToRgb from "../functions/hslToRgb"
import randomColor from "../functions/randomColor"
import "./graph.css"

const maxNodeSize = 18
const minNodeSize = 4
const depthSteps = 3

const hueShiftPerNode = 45

interface PageNode extends SimulationNodeDatum {
    id: string
    label: string
}

type PageLink = SimulationLinkDatum<PageNode>

const nodes: PageNode[] = []

const links: PageLink[] = []

const initGraph = () => {
    addBeginTraversalListener(() => {})

    addEndTraversalListener(() => {})

    const width = window.innerWidth
    const height = window.innerHeight
    const svg = d3.select("#graph").attr("width", width).attr("height", height)

    const getNodeColor = (node: PageNode) => {
        return randomColor()
    }

    const linkElements = svg
        .append("g")
        .selectAll("line")
        .data(links)
        .enter() //create placeholder
        .append("line")
        .attr("stroke-width", 1)
        .attr("stroke", "#E5E5E5")

    const nodeElements = svg
        .append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", getNodeColor)

    const textElements = svg
        .append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text((node) => node.label)
        .attr("font-size", 15)
        .attr("dx", 15)
        .attr("dy", 5)

    const simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody().strength(-70))
        .force("center", d3.forceCenter(width / 2, height / 2))
    // .force("collision", d3.forceCollide(50))

    simulation.nodes(nodes)

    simulation.force(
        "link",
        d3
            .forceLink<PageNode, PageLink>(links)
            .id((node) => node.id)
            .strength((link: any) => link.strength)
    )

    simulation.on("tick", () => {
        nodeElements
            .attr("cx", (node) => node.x ?? 0)
            .attr("cy", (node) => node.y ?? 0)

        textElements
            .attr("x", (node) => node.x ?? 0)
            .attr("y", (node) => node.y ?? 0)

        linkElements
            .attr("x1", (link: any) => link.source.x)
            .attr("y1", (link: any) => link.source.y)
            .attr("x2", (link: any) => link.target.x)
            .attr("y2", (link: any) => link.target.y)
    })

    const handleNewPage = (event: NewPageEvent) => {
        const detail = event.detail

        // if (graph.hasNode(detail.id)) {
        //     graph.dropNode(detail.id)
        // }

        const nodeSize = Math.max(
            minNodeSize,
            maxNodeSize - detail.depth * depthSteps
        )

        const hue = detail.depth * hueShiftPerNode
        const color = hslToRgb((hue % 360) / 360, 1, 0.5)

        //add node
    }

    document.addEventListener("newPage", handleNewPage as any)
}

export default initGraph
