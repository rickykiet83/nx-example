const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
const { join } = require('path');

const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/cart/' : '/';

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/cart'),
    clean: true,
    publicPath: base,
  },
  devServer: {
    port: 4201,
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.tsx',
      index: './src/index.html',
      baseHref: base,
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.scss'],
      outputHashing: isProd ? 'all' : 'none',
      optimization: isProd,
    }),
    new NxReactWebpackPlugin({}),
  ],
};
