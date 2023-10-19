import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation';
import topLevelAwait from 'vite-plugin-top-level-await';
import { createProxy } from './build/vite/proxy';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } =
    viteEnv;
  // const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
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
        name: 'app',
        filename: 'remoteEntry.js',
        remotes: {
          // "list": "https://list.wozaizhao.com/assets/remoteEntry.js"
          "list": "http://localhost:5001/assets/remoteEntry.js",
        },
        exposes: {
          './routerConstant': './src/router/constant.ts',
          './utilsIndex': './src/utils/index.ts',
          './utilsAxios': './src/utils/http/axios/index.ts',
          './compForm': './src/components/Form/index.ts',
          './compModal': './src/components/Modal/index.ts',
          './compTable': './src/components/Table/index.ts'
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
      port: 5000,
      strictPort: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/'),
        },
      },
    },
  }
}
