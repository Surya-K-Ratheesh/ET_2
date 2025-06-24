import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ERAM TECH Visualizer',
        short_name: 'ERAM-Viz',
        description: 'AR-style door/window visualization tool',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/ET.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@tensorflow/tfjs']
  }
})