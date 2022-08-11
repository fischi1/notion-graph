import JSZip from "jszip"
import idToUrl from "../functions/idToUrl"
import { createEmptyPage, Page } from "../types/Page"

const fixedId = "ffb0e8ae-b45e-40b6-925f-a453f9dd3f57"
const fixedIdAlternate = fixedId.replaceAll("-", "")

const workspaceFolderRegex =
    /^Export-[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/

type WorkspaceExportType = "none" | "rootFolder" | "multipleItemsInRoot"

const checkIfWorkspaceExport = (filePaths: string[]): WorkspaceExportType => {
    // workspace-html_20220730.zip
    if (
        filePaths.length > 0 &&
        workspaceFolderRegex.test(filePaths[0].split("/")[0])
    ) {
        return "rootFolder"
    }

    // workspace-html_202200810.zip
    let foundFirstSubpage = false
    let firstSubpage = 0
    for (
        firstSubpage = 0;
        firstSubpage < filePaths.length && !foundFirstSubpage;
        firstSubpage++
    ) {
        const path = filePaths[firstSubpage]
        if (path.split("/").length > 1) {
            foundFirstSubpage = true
        }
    }
    if (firstSubpage > 2) {
        return "multipleItemsInRoot"
    }

    return "none"
}

const modifyFilePathForExportType = (
    filePath: string,
    workspaceExport: WorkspaceExportType
): string => {
    switch (workspaceExport) {
        case "rootFolder":
            //remove "Export-2653ea2c-750d-4917-9fed-900b16d80734" and add `Workspace ${fixedIdAlternate}/` instead
            return [
                `Workspace ${fixedIdAlternate}`,
                ...filePath.split("/").slice(1)
            ].join("/")

        case "multipleItemsInRoot":
            return `Workspace ${fixedIdAlternate}/${filePath}`

        default:
            return filePath
    }
}

const parseZipFile = async (file: File) => {
    const zip = await JSZip.loadAsync(file)

    const filePaths = Object.keys(zip.files)

    const workspaceExportType = checkIfWorkspaceExport(filePaths)
    console.log("workspaceExportType", workspaceExportType)

    const rootPage = createEmptyPage()

    if (workspaceExportType !== "none") {
        //Notion opens the last visited page if the id doesn't exist
        rootPage.id = fixedId
        rootPage.title = "Workspace"
        rootPage.url = "https://notion.so"
    }

    for (const absoluteFilePath of filePaths) {
        let text = ""
        if (absoluteFilePath.endsWith(".html")) {
            text = (await zip.file(absoluteFilePath)?.async("text")) ?? ""
        }

        const workspacePath = modifyFilePathForExportType(
            absoluteFilePath,
            workspaceExportType
        )

        addFileToPages(workspacePath, rootPage, text)
    }
    console.log("zip file parsed", rootPage)
    return rootPage
}

const validateFilePath = (filePath: string[]) => {
    for (let i = 0; i < filePath.length; i++) {
        if (i >= filePath.length - 1) {
            if (!filePath[i].match(/^.*\s[0-9a-f]{32}.html$/)) {
                return false
            }
        } else {
            if (!filePath[i].match(/^.*\s[0-9a-f]{32}$/)) {
                return false
            }
        }
    }
    return true
}

const addFileToPages = (filePath: string, rootPage: Page, text: string) => {
    if (!filePath.endsWith(".html")) {
        console.warn("path doesn't end with '.html'", filePath)
        return
    }

    const splitFilePath = filePath.split("/")
    const pathValid = validateFilePath(splitFilePath)
    if (!pathValid) {
        console.warn("path not valid", splitFilePath)
        return
    }

    if (!text) {
        console.warn("no text", filePath)
        return
    }
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

export default parseZipFile
