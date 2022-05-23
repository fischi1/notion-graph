import { defineConfig } from "vite"
import visualizer from "rollup-plugin-visualizer"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
