import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages project site lives at https://user.github.io/REPO/
// User/organization site (repo named username.github.io) lives at root /.
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [
    vue(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        if (process.env.GITHUB_PAGES !== 'true') return
        const index = resolve('dist/index.html')
        const fallback = resolve('dist/404.html')
        if (existsSync(index)) cpSync(index, fallback)
      },
    },
  ],
  build: {
    target: 'es2020',
    outDir: 'dist',
  },
})
