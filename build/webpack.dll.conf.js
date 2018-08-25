/**
 *  CommonsChunkPlugin和DllPlugin插件的区别
 *  1、CommonsChunkPlugin和DllPlugin插件将依赖库抽离。
 *  2、CommonsChunkPlugin 每次run时都会对依赖进行打包，速度变慢
 *  DllPlugin先打包好依赖库，然后只对每次都修改的js做打包。
 */ 

const webpack = require('webpack')
const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
//  'vuex', 'axios'
module.exports = {
  entry: {
    vendor: ['vue', 'lodash.debounce', 'vue-router']
  },
  output: {
    filename: '[name]_[hash:6].dll.js',
    path: path.resolve(__dirname, '../static'),
    library: '[name]_[hash:6]_library'
  },
  plugins: [
    // https://webpack.docschina.org/plugins/dll-plugin/
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../static', '[name]-manifest.json'),
      // This must match the output.library option above
      name: '[name]_[hash:6]_library',
      context: __dirname
    }),
    // https://github.com/gdborton/webpack-parallel-uglify-plugin
    new ParallelUglifyPlugin({
      cacheDir: path.resolve(__dirname, '../.cache'),  // 可选的绝对路径用作缓存
      sourceMap: true,
      uglifyES: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 保留注释
        },
        compress: { // 压缩
          warnings: false, // 删除无用代码时不输出警告
          drop_console: true, // 删除console语句
          collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
  ]
}