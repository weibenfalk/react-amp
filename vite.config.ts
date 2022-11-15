import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitePluginRaw from 'vite-plugin-raw';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vitePluginRaw({
      match: /\.svg$/,
      exclude: [new RegExp(path.resolve(__dirname, './src/assets'))]
    })
  ],
  assetsInclude: ['**/*.BMP']
});
