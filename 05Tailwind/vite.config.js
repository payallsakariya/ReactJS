import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/': {
    //     target: 'https://hitvaniapp.excellcons.com/api/menucontent',
    //     changeOrigin: true,
    //   },
    //   '/api': {
    //     target: 'https://hitvaniapp.excellcons.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
})
