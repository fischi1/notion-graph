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

type PageLink = SimulationLinkDatum<PageNode> & {
    strength: number
}

const nodes: PageNode[] = [
    { id: "elk", label: "Elk" },
    { id: "mammal", label: "Mammals" },
    { id: "dog", label: "Dogs" },
    { id: "cat", label: "Cats" },
    { id: "fox", label: "Foxes" }
]

const links: PageLink[] = [
    { target: "elk", source: "mammal", strength: 0.7 },
    { target: "mammal", source: "dog", strength: 0.7 },
    { target: "dog", source: "cat", strength: 0.7 },
    { target: "dog", source: "fox", strength: 0.7 }
]

const initGraph = () => {
    addBeginTraversalListener(() => {})

    addEndTraversalListener(() => {})

    const width = window.innerWidth
    const height = window.innerHeight
    const svg = d3.select("#graph").attr("width", width).attr("height", height)

    const getNodeColor = (node: PageNode) => {
        return randomColor()
    }

    let linkElements = svg
        .append("g")
        .attr("stroke-width", 4)
        .attr("stroke", "#E5E5E5")
        .selectAll("line")
    // .data(links)
    // .enter()
    // .append("line")

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

    const restart = () => {
        console.log("restart")
        // Apply the general update pattern to the nodes.
        // node = node.data(nodes, function (d) {
        //     return d.id
        // })
        // node.exit().remove()
        // node = node
        //     .enter()
        //     .append("circle")
        //     .attr("fill", function (d) {
        //         return color(d.id)
        //     })
        //     .attr("r", 8)
        //     .merge(node)

        // Apply the general update pattern to the links.
        // .selectAll("line")
        // .data(links)
        // .enter()
        // .append("line")
        //@ts-ignore
        linkElements = linkElements.data(links)
        linkElements.exit().remove()
        linkElements = linkElements.enter().append("line").merge(linkElements)

        // Update and restart the simulation.
        // simulation.nodes(nodes)
        simulation.force("link").links(links)
        // simulation.alpha(1).restart()
        simulation.restart()
    }

    restart()

    d3.interval(() => {
        links.pop()
        restart()
    }, 2000)

    d3.interval(
        () => {
            links.push({ target: "dog", source: "fox", strength: 0.7 })
            restart()
        },
        2000,
        d3.now() + 1000
    )

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
