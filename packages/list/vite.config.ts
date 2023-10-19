import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation';
import topLevelAwait from 'vite-plugin-top-level-await';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/',
      },
    ],
    dedupe: ['vue'],
  },
  plugins: [
    vue(),
    federation({
      name: 'list',
      filename: 'remoteEntry.js',
      remotes: {
        // "app": "https://app.wozaizhao.com/assets/remoteEntry.js",
        "app": "http://localhost:5000/assets/remoteEntry.js",
      },
      exposes: {
        './routerIndex': './src/router/index.ts'
      },
      shared: {
          vue: {},
          pinia: {}
      }
    }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  preview: {
    host: '0.0.0.0',
    port: 5001,
    strictPort: true,
    open: false
  },
})
