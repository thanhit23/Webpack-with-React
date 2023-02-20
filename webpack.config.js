const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/, // sử dụng babel loader cho nhưng file .js
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/, // sử dụng babel loader cho nhưng file .css
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    compress: true,
    open: true,
  },
  // watchOptions: {
  //   ignored: '**/node_modules',
  // },
  // devtool: "inline-source-map",
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: 'public/index.html',
    // })
  ]
};
