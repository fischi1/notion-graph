import chroma from "chroma-js"
import Graphology from "graphology"
import ForceSupervisor from "graphology-layout-force/worker"
import Sigma from "sigma"
import "./graph.css"

const initGraph = () => {
    const graph = new Graphology()

        console.log("effect")
        let i = 0
        const nodes: string[] = []
        
        setInterval(() => {
            if (i >= 300) return
            console.log(i)

            const name = "n" + i

            try {
                graph.addNode(name, {
                    x: Math.random() * 2 - 1,
                    y: Math.random() * 2 - 1,
                    size: 10,
                    label: name,
                    color: chroma.random().hex()
                })
            } catch (error) {}

            if (i > 0) {
                graph.addEdge(
                    name,
                    nodes[Math.floor(Math.random() * nodes.length)]
                )

                if (Math.random() > 0.5) {
                    try {
                        graph.addEdge(
                            nodes[Math.floor(Math.random() * nodes.length)],
                            nodes[Math.floor(Math.random() * nodes.length)]
                        )
                        graph.addEdge(
                            nodes[Math.floor(Math.random() * nodes.length)],
                            nodes[Math.floor(Math.random() * nodes.length)]
                        )
                    } catch(error) {}
                }
            }

            nodes.push(name)

            i++
        }, 25)

        const layout = new ForceSupervisor(graph, {})
        layout.start()

        const renderer = new Sigma(graph, document.querySelector("#graph") as HTMLDivElement)
}

export default initGraph
