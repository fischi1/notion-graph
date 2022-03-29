import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import visualizer from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact()],
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
