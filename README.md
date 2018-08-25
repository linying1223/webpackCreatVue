# myproject

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## webpack相关配置

#### HappyPack:

把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

同一时刻处理多个任务，发挥多核 CPU 电脑的威力，以提升构建速度

#### DllPlugin
CommonsChunkPlugin和DllPlugin插件的区别

1、CommonsChunkPlugin和DllPlugin插件将依赖库抽离。

2、CommonsChunkPlugin 每次run时都会对依赖进行打包，速度变慢

3、DllPlugin先打包好依赖库，然后只对每次都修改的js做打包。

用DllPlugin插件需要把CommonsChunkPlugin删除

#### ParallelUglifyPlugin
并行压缩，提升构建速度