import react from "@vitejs/plugin-react"
import visualizer from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import removeConsole from "vite-plugin-remove-console"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), removeConsole(), eslint()],
    base: "/notion-graph/",
    build: {
        rollupOptions: {
            plugins: [visualizer()]
        }
    },
    define: {
        "process.env.VITE_APP_VERSION": JSON.stringify(
            process.env.npm_package_version
        )
    }
})
