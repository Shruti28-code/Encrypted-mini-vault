// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),         // Add React plugin
    tailwindcss(),   // Tailwind plugin
  ],
  resolve: {
    dedupe: ['react', 'react-dom'] // Ensure only one React copy is used
  }
})
