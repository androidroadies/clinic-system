import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 5000,
        host: '0.0.0.0',
        allowedHosts: true,
        proxy: {
          '/api': {
            target: env.BACKEND_URL,
            changeOrigin: true,
          },
          '/socket.io': {
            target: env.BACKEND_URL,
            changeOrigin: true,
            ws: true,
          },
          '/site': {
            target: env.BACKEND_URL,
            changeOrigin: true,
          },
        },
        historyApiFallback: true,
      },
      appType: 'spa',
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
