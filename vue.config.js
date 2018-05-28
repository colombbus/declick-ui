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
      .plugin('html-template')
        .use(HtmlWebpackPlugin, [{
          template: 'public/index.html',
        }])
        .end()
  },
}
