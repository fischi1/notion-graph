import react from "@vitejs/plugin-react"
import visualizer from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import removeConsole from "vite-plugin-remove-console"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), removeConsole()],
    build: {
        rollupOptions: {
            plugins: [visualizer()]
        }
    }
})
