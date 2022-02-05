import output from "../../api/output-7906799a-0352-45bc-b75e-02a6e9a540d5.json"
import { Page } from "../../api/src/types/Page"
import initGraph from "./graph/graph"
import traverseExistingGraph from "./graph/traverseExistingGraph"
import "./main.css"
import "./reset.css"

initGraph()
traverseExistingGraph(output as Page)
