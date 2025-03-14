import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/vendas-pascoa',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['easter-egg.svg', 'background-2.png', 'hero.png'],
      manifest: {
        name: 'Lojinha de Páscoa',
        short_name: 'Páscoa',
        description: 'Loja de Páscoa - Encontre os melhores produtos para sua celebração',
        theme_color: '#1976d2',
        icons: [
          {
            src: '/vendas-pascoa/easter-egg.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/vendas-pascoa/easter-egg.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
