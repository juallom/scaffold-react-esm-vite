import rspack from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

export default {
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
      ...[true, false].map((isJsx) => {
        return {
          test: isJsx ? /\.tsx$/i : /\.ts$/i,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  jsx: isJsx,
                },
                externalHelpers: true,
                preserveAllComments: false,
                ...(() => {
                  return isJsx
                    ? {
                        transform: {
                          react: {
                            runtime: 'automatic',
                            throwIfNamespace: true,
                            useBuiltins: false,
                          },
                        },
                      }
                    : {};
                })(),
              },
            },
          },
          type: 'javascript/auto',
        };
      }),
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader'],
        options: {
          babel: false,
        },
      },
      {
        test: /\.(png|jpg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      scriptLoading: 'module',
    }),
  ],
};
