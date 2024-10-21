import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve("src", 'index.js'),
      name: 'react-icon-cloud-js',
      fileName: (format) => `react-icon-cloud-js.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  server: {
    open: true,
  },
});
