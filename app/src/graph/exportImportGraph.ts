const localStorageKey = "graph"

interface Graphology {
    export: () => any
    import: (data: any) => void
}

const exportGraph = (graph: Graphology) => {
    localStorage.setItem(localStorageKey, JSON.stringify(graph.export()))
}

const importGraph = (graph: Graphology) => {
    const graphData = localStorage.getItem(localStorageKey)
    if (graphData) {
        graph.import(JSON.parse(graphData))
    }
}

export { exportGraph, importGraph }
