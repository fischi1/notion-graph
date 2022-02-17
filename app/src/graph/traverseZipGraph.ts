import JSZip from "jszip"
import { createEmptyPage, Page } from "../../../api/src/types/Page"
import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { dispatchEndTraversal } from "../events/EndTraversalEvent"
import idToUrl from "../functions/idToUrl"
import stringToId from "../functions/stringToId"
import traverseExistingGraph from "./traverseExistingGraph"

//const content = await zip.file(file)?.async("string")
//read file content

const initTraverseZipGraph = async () => {
    console.log("registering listener")

    addBeginTraversalListener(handleBeginTraversal)
}

const handleBeginTraversal = async () => {
    const input = window.document.getElementById(
        "input-file"
    ) as HTMLInputElement
    const file = input?.files?.item(0)

    if (!file) return

    const zip = await JSZip.loadAsync(file)
    const rootPage = createEmptyPage()
    for (const absoluteFilePath in zip.files) {
        await addFileToPages(absoluteFilePath, rootPage, zip)
    }
    console.log(rootPage)
    await traverseExistingGraph(rootPage, "breadth-first")
    dispatchEndTraversal({})
    console.log("done")
}

const validateFilePath = (filePath: string[]) => {
    for (let i = 0; i < filePath.length; i++) {
        if (i >= filePath.length - 1) {
            if (!filePath[i].match(/^.*\s[0-9a-f]{5}.html$/)) {
                return false
            }
        } else {
            if (!filePath[i].match(/^.*\s[0-9a-f]{5}$/)) {
                return false
            }
        }
    }
    return true
}

const addFileToPages = async (filePath: string, rootPage: Page, zip: JSZip) => {
    if (!filePath.endsWith(".html")) return

    const splitFilePath = filePath.split("/")
    const pathValid = validateFilePath(splitFilePath)
    if (!pathValid) {
        console.warn("path not valid", splitFilePath)
        return
    }

    const text = await zip.file(filePath)?.async("text")
    if (!text) return
    const pageInfo = parseHtml(text, filePath)

    let title = pageInfo.icon ? pageInfo.icon + " " : ""
    title += pageInfo.title

    let currentPage = rootPage
    if (splitFilePath.length === 1) {
        rootPage.id = pageInfo.id
        rootPage.title = title
        rootPage.url = idToUrl(pageInfo.id)
    } else {
        for (let i = 1; i < splitFilePath.length - 1; i++) {
            const idStart = getIdStart(splitFilePath[i])
            const nextPage = currentPage.children.find((page) =>
                page.id.startsWith(idStart ?? "")
            )
            if (!nextPage) {
                throw new Error(
                    `Couldn't find child page '${idStart}' in current page: ${currentPage.title} ${currentPage.id}`
                )
            }
            currentPage = nextPage
        }

        const newPage = createEmptyPage()
        newPage.id = pageInfo.id
        newPage.title = title
        newPage.url = idToUrl(pageInfo.id)

        currentPage.children.push(newPage)
    }
}

const parser = new DOMParser()
const parseHtml = (html: string, path: string) => {
    const htmlDoc = parser.parseFromString(html, "text/html")

    const rootArticle = htmlDoc.querySelector("article.page")
    if (!rootArticle) {
        throw new Error("Couldn't find root article: " + path)
    }

    const id = rootArticle.id

    const pageTitle = htmlDoc.querySelector("h1.page-title")
    if (!pageTitle) {
        console.warn("Couldn't find page title", path)
    }
    const title = pageTitle?.textContent ?? ""

    const iconElement = htmlDoc.querySelector(
        "header .page-header-icon span.icon"
    )
    const icon = iconElement?.textContent ?? null

    return { id, title, icon }
}

const regex = new RegExp(/[0-9a-f]{5}/)

const getIdStart = (filename: string) => {
    const matches = regex.exec(filename)

    if (!matches || matches.length === 0) return null

    return matches[matches.length - 1]
}

export default initTraverseZipGraph
