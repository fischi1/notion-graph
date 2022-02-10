import JSZip from "jszip"
import { createEmptyPage, Page } from "../../../api/src/types/Page"
import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import idToUrl from "../functions/idToUrl"
import stringToId from "../functions/stringToId"

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
        addFileToPages(absoluteFilePath, rootPage)
    }
    console.log("done")
    console.log(rootPage)
}

const validateFilePath = (filePath: string[]) => {
    for (let i = 0; i < filePath.length; i++) {
        if (i >= filePath.length - 1) {
            if (!filePath[i].match(/^.*\s[0-9a-f]{32}((.md)|(.csv))$/)) {
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

const addFileToPages = (filePath: string, rootPage: Page) => {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".csv")) return

    const splitFilePath = filePath.split("/")
    const pathValid = validateFilePath(splitFilePath)
    if (!pathValid) {
        console.warn("path not valid")
        return
    }

    const filename = splitFilePath[splitFilePath.length - 1]
    const pageNameAndId = fileNameToPageAndId(filename)

    let currentPage = rootPage
    if (splitFilePath.length === 1) {
        rootPage.id = pageNameAndId.id
        rootPage.title = pageNameAndId.page
        rootPage.url = idToUrl(pageNameAndId.id)
    } else {
        for (let i = 1; i < splitFilePath.length - 1; i++) {
            const id = stringToId(splitFilePath[i])
            const nextPage = currentPage.children.find((page) => page.id == id)
            if (!nextPage) {
                throw new Error(
                    `Couldn't find child page '${id}' in current page: ${currentPage.title} ${currentPage.id}`
                )
            }
            currentPage = nextPage
        }

        const newPage = createEmptyPage()
        newPage.id = pageNameAndId.id
        newPage.title = pageNameAndId.page
        newPage.url = idToUrl(pageNameAndId.id)

        currentPage.children.push(newPage)
    }
}

const fileNameToPageAndId = (filename: string) => {
    const id = stringToId(filename)
    if (!id) {
        throw new Error("counldn't parse uuid from filename: " + filename)
    }
    const page = filename.substring(0, filename.lastIndexOf(" "))

    return { page, id }
}

export default initTraverseZipGraph
