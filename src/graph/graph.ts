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

const nodes: PageNode[] = []

const links: PageLink[] = []

const initGraph = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const svg = d3.select("#graph").attr("width", width).attr("height", height)

    const getNodeColor = (node: PageNode) => {
        const hue = node.depth * hueShiftPerNode
        const color = hslToRgb((hue % 360) / 360, 1, 0.5)
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }

    let linkElements: any = svg
        .append("g")
        .attr("stroke-width", 4)
        .attr("stroke", "#E5E5E5")
        .selectAll("line")

    let nodeElements: any = svg.append("g").selectAll("circle")

    let textElements: any = svg.append("g").selectAll("text")

    const simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody().strength(-70))
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
            .attr("r", 10)
            .attr("fill", getNodeColor)
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
            .attr("font-size", 15)
            .attr("dx", 15)
            .attr("dy", 5)
            .merge(textElements)

        // Update and restart the simulation.
        simulation.nodes(nodes)
        //@ts-ignore
        simulation.force("link").links(links)
        simulation.alpha(1).restart()
    }

    // function drag_start(d: any, node: PageNode) {
    //     console.log(d)
    //     if (!d.active) simulation.alphaTarget(0.3).restart()
    //     d.fx = d.x
    //     d.fy = d.y
    // }

    // //make sure you can't drag the circle outside the box
    // function drag_drag(d: any) {
    //     d.fx = d.x
    //     d.fy = d.y
    // }

    // function drag_end(d: any) {
    //     if (!d.active) simulation.alphaTarget(0)
    //     d.fx = null
    //     d.fy = null
    // }

    restart()

    const handleNewPage = (event: NewPageEvent) => {
        const detail = event.detail

        // if (graph.hasNode(detail.id)) {
        //     graph.dropNode(detail.id)
        // }

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
