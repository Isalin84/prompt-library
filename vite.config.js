import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'create-nojekyll',
      closeBundle() {
        writeFileSync(join(__dirname, 'dist', '.nojekyll'), '')
      }
    }
  ],
  base: '/prompt-library/',
})
