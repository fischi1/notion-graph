import react from "@vitejs/plugin-react"
import visualizer from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import removeConsole from "vite-plugin-remove-console"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), removeConsole()],
    server: {
        proxy: {
            "/api": {
                target: "http://192.168.0.10:3001",
                changeOrigin: true,
                secure: false,
                ws: true
            },
            "/socket.io": {
                target: "http://192.168.0.10:3001",
                changeOrigin: true,
                secure: false,
                ws: true
            }
        }
    },
    build: {
        rollupOptions: {
            plugins: [visualizer()]
        }
    }
})
