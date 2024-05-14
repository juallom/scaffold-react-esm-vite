const rspack = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './src/index.tsx',
  },
  target: 'es2020',
  output: {
    module: true,
    chunkFormat: 'module',
    chunkLoading: 'import',
    library: {
      type: 'module',
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  externalsType: 'module',
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              externalHelpers: true,
              preserveAllComments: false,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  // optimization: {
  //   moduleIds: 'named',
  //   runtimeChunk: 'single',
  //   chunkIds: 'named',
  //   // treeshake unused code in development
  //   // needed so that browser build does not pull in server code
  //   usedExports: true,
  //   innerGraph: true,
  //   splitChunks: {
  //     chunks: 'async',
  //   },
  //   minimize: true,
  // },
  plugins: [
    new ReactRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      scriptLoading: 'module',
    }),
  ],
};
module.exports = config;
