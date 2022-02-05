import chroma from "chroma-js"
import Graphology from "graphology"
import GraphologyLayout from "graphology-layout-forceatlas2"
import ForceSupervisor from "graphology-layout-forceatlas2/worker"
import Sigma from "sigma"
import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { NewPageEvent } from "../events/NewPageEvent"
import "./graph.css"

const maxNodeSize = 18
const minNodeSize = 4
const depthSteps = 3

const initGraph = () => {
    const graph = new Graphology()

    const layout = new ForceSupervisor(graph, {
        settings: GraphologyLayout.inferSettings(1000)
    })
    layout.start()

    const renderer = new Sigma(
        graph,
        document.querySelector("#graph") as HTMLDivElement
    )

    renderer.on("clickNode", (event) => {
        const url = graph.getNodeAttribute(event.node, "url")
        window.open(url, "_blank", "noopener noreferrer")
    })

    addBeginTraversalListener(() => {
        graph.clear()
        renderer.getCamera().animatedReset()
    })

    const handleNewPage = (event: NewPageEvent) => {
        const detail = event.detail

        if (graph.hasNode(detail.id)) {
            graph.dropNode(detail.id)
        }

        const nodeSize = Math.max(
            minNodeSize,
            maxNodeSize - detail.depth * depthSteps
        )

        let x = Math.random() * 2 - 1
        let y = Math.random() * 2 - 1

        if (detail.parentId) {
            const parentNode = graph.getNodeAttributes(detail.parentId)
            x += parentNode.x
            y += parentNode.y
        }

        graph.addNode(detail.id, {
            x: x,
            y: y,
            size: nodeSize,
            label: detail.title,
            url: detail.url,
            color: chroma.random().hex()
        })

        if (detail.parentId) {
            graph.addEdge(detail.parentId, detail.id, {
                type: "arrow",
                size: Math.ceil(nodeSize / 5) + 1
            })
        }
    }

    document.addEventListener("newPage", handleNewPage as any)
}

export default initGraph
