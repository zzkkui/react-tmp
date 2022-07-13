import { PluginOption } from 'vite';
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';
import purgeIcons from 'vite-plugin-purge-icons';
import vitePluginImp from 'vite-plugin-imp'
import autoCSSModulePlugin from 'vite-plugin-auto-css-modules'
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
import createRestart from './restart';
import createSpritesmith from './spritesmith';
import createIconComponent from './unplugin-icons';
import { configSvgIconsPlugin } from './svg-icons';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_SPRITE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    react(),
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // unplugin-icons
  vitePlugins.push(createIconComponent());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(vitePluginImp({
    libList: [
      {
        libName: 'antd',
        style(name) {
          return `antd/es/${name}/style/index.js`
        }
      },
    ]
  }))

  vitePlugins.push(autoCSSModulePlugin())

  // vite-plugin-restart
  vitePlugins.push(createRestart());

  // vite-plugin-spritesmith
  VITE_USE_SPRITE && vitePlugins.push(createSpritesmith(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }

  return vitePlugins;
}
