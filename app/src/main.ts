import output from "../../output.json"
import initGraph from "./graph/graph"
import traverseExistingGraph from "./graph/traverseExistingGraph"
import "./main.css"
import { Page } from "./notion/types/Page"
import "./reset.css"

initGraph()
traverseExistingGraph(output as Page)
