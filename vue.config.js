require('dotenv').config()

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  chainWebpack: config => {
    config
      .entry('app')
        .prepend('@babel/polyfill')
        .end()
      .resolve
        .modules
          .add('bower_components')
          .end()
        .alias
          .set('vue$', 'vue/dist/vue')
          .set('paper$', 'paper/dist/paper-core')
          .end()
        .end()
      .plugin('jQuery-provider')
        .use(webpack.ProvidePlugin, [{
          '$': 'jquery',
          'jQuery': 'jquery',
          'window.jQuery': 'jquery',
        }])
        .end()
      .plugin('paper-window-dependency-fix')
        .use(webpack.IgnorePlugin, [
          /^\.\/node\/window$/,
          new RegExp(path.join('paper', 'dist$'))
        ])
        .end()
      .plugin('paper-extend-dependency-fix')
        .use(webpack.IgnorePlugin, [
          /^\.\/node\/extend$/,
          new RegExp(path.join('paper', 'dist$'))
        ])
        .end()
      .plugin('html-template')
        .use(HtmlWebpackPlugin, [{
          template: 'public/index.html',
        }])
        .end()
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    allowedHosts: [
      process.env.HOST,
    ],
  },
}
