import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
  federation({
      name: 'main_app',
      remotes: {
        utilityApp: 'utility_app@http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
  }),
  react(),
  tsconfigPaths(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5000,
    strictPort: true,
    cors: true,
  },
});
