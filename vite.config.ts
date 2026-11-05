import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { API_PROXY_TARGET = 'http://localhost:3000' } = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: { proxy: { '/api': API_PROXY_TARGET, '/assets': API_PROXY_TARGET } },
  }
})
