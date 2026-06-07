import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: set base to '/your-repo-name/'
// Example: base: '/am-simulation/'
export default defineConfig({
  plugins: [react()],
  base: '/am-simulation/',
})
