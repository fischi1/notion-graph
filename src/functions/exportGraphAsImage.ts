import { getNodeRadius, PageNode } from "../graph/graph"
import downloadSvgAsPng from "./downloadSvgAsPng"

const calculateLabelOffset = (svg: HTMLOrSVGImageElement, node: PageNode) => {
    const label = svg.querySelector(
        `#label-${node.id}`
    ) as SVGTextElement | null

    if (!label) {
        return 0
    }

    return label.getBBox().width
}

const exportGraphAsImage = (
    orginalSvg: HTMLOrSVGImageElement,
    nodes: PageNode[],
    multiplier: number,
    padding: number
) => {
    const svg = orginalSvg.cloneNode(true) as HTMLOrSVGImageElement

    //find top-most node
    let minY = Number.MAX_VALUE
    let minYNode: PageNode | null = null

    //find bottom-most node
    let maxY = Number.MIN_VALUE
    let maxYNode: PageNode | null = null

    //find left-most node
    let minX = Number.MAX_VALUE
    let minXNode: PageNode | null = null

    //find right-most node
    let maxX = Number.MIN_VALUE
    let maxXNode: PageNode | null = null

    for (const node of nodes) {
        const y = node.y ?? 0
        const x = node.x ?? 0

        if (y < minY) {
            minY = y
            minYNode = node
        }
        if (y > maxY) {
            maxY = y
            maxYNode = node
        }

        if (x < minX) {
            minX = x
            minXNode = node
        }
        if (x > maxX) {
            maxX = x
            maxXNode = node
        }
    }

    if (!minYNode || !maxYNode || !minXNode || !maxXNode) {
        console.error(
            "minYNode",
            minYNode,
            "maxYNode",
            maxYNode,
            "minXNode",
            minXNode,
            "maxXNode",
            maxXNode
        )
        return Promise.reject()
    }

    console.log("minY", minY, minYNode)
    console.log("maxY", maxY, maxYNode)

    console.log("minX", minX, minXNode)
    console.log("maxX", maxX, maxXNode)

    const offset = getNodeRadius(minXNode) + padding

    minX -= offset
    maxX += offset + calculateLabelOffset(orginalSvg, maxXNode)
    minY -= offset
    maxY += offset

    let width = maxX - minX
    let height = maxY - minY
    console.log("dimensions", width, height)

    width *= multiplier
    height *= multiplier
    maxX *= multiplier
    minX *= multiplier
    maxY *= multiplier
    minY *= multiplier

    let centerX = (maxX + minX) / 2
    let centerY = (maxY + minY) / 2
    console.log("center", centerX, centerY)

    svg.setAttribute("viewBox", [0, 0, width, height] + "")
    svg.setAttribute("height", height + "")
    svg.setAttribute("width", width + "")

    const zoomGroup = svg.querySelector("#zoom-group")

    if (!zoomGroup) {
        return Promise.reject("no element #zoom-group found in svg")
    }

    zoomGroup.setAttribute(
        "transform",
        `translate(${width / 2 - centerX},${
            height / 2 - centerY
        }) scale(${multiplier})`
    )

    const fileName =
        nodes[0].label
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim()
            .replaceAll(" ", "_") + ".png"

    return downloadSvgAsPng(svg, {
        filename: fileName,
        width: width,
        height: height,
        backgroundColor: "#222220"
    })
}

export default exportGraphAsImage
