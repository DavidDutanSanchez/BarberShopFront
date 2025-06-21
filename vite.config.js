import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'google231bf1fb3f379b3e.html',
          dest: '' // lo copia en la raíz de dist/
        }
      ]
    })
  ]
})
