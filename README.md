# Notion Graph

![Screenshot of a generated graph](/notiongraph_screenshot.png)

This tool creates interactive graphs out of Notion workspaces and pages.

Notion itself doesn't offer any functionalities to generate an overview of your page structure as a graph. That is the reason why I created this app.

It creates a force-directed graph out of your Notion data. All you need is a HTML export of your whole workspace or pages.

[OPEN APP](https://lukasfischer.me/notion-graph/)

## Usage

After cloning you can run the app in dev mode with the following commands

```bash
npm install
npm run dev
```

If you want to build the application use `npm run build`.

## Features

-   Create a graph out of your Notion exports
-   Change how the graph is generated
-   Collapse pages with a lot of children (lists, boards, databases, ...)
-   Export your graph as an image
-   Clicking on a node opens the page in Notion
-   The last generated graph is stored in `localStorage`

## Technologies

-   [React](https://reactjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [D3.js](https://d3js.org/) and [d3-force](https://github.com/d3/d3-force)
-   [JSZip](https://github.com/Stuk/jszip)
-   [Vite](https://vitejs.dev/)
