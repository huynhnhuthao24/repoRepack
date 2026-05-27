import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {HotUpdaterPlugin} from '@hot-updater/repack';
import {ReanimatedPlugin} from '@callstack/repack-plugin-reanimated';
import rspack from '@rspack/core';
import fs from 'fs';
import {RepackUnistylePlugin} from 'react-native-unistyles/repack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */
function getDynamicAliases(srcPath) {
  const folders = fs
    .readdirSync(srcPath, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Tạo object paths
  const paths = folders.reduce((acc, folder) => {
    acc[`@${folder}`] = path.join(srcPath, folder);
    return acc;
  }, {});
  return paths;
}

const alias = getDynamicAliases(path.resolve(__dirname, 'src'));
export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions({enablePackageExports: true}),
    alias: {
      ...alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
    extensions: [
      '.sql',
      ...Repack.getResolveOptions({enablePackageExports: true}).extensions,
    ],
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          options: {
            lazyImports: true,
          },
          parallel: true,
        },
      },
      ...Repack.getAssetTransformRules({
        inline: true,
      }),
      {
        test: /\.sql$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new HotUpdaterPlugin(),
    new Repack.RepackPlugin({}),
    new ReanimatedPlugin({
      unstable_disableTransform: true,
    }),
    // new rspack.IgnorePlugin({
    //   resourceRegExp: /(react-native-reanimated\/src\/reanimated2\/core)/,
    // }),
  ],
});
