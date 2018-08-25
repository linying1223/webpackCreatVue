'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var HappyPack = require('happypack')

const happyThreadPool = HappyPack.ThreadPool({ size: 5 })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'happypack/loader?id=vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // HappyPack 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
    // 同一时刻处理多个任务，发挥多核 CPU 电脑的威力，以提升构建速度
    new HappyPack({
      id: 'babel-loader',
      threadPool: happyThreadPool,
      loaders: [ 'babel-loader?cacheDirectory' ]
    }),
    new HappyPack({
      id: 'vue-loader',
      threadPool: happyThreadPool,
      loaders: [ 'vue-loader' ]
    }),
    new HappyPack({
      threadPool: happyThreadPool,
      loaders: [{
        path: 'vue-loader',
        query: {
          vueLoaderConfig
        }
      }]
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/vendor-manifest.json'), // eslint-disable-line
      name: 'vendor_library'
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
