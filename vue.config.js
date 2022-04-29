// const port = process.env.port || 80 // dev port
module.exports = {
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false,
    devServer: {
      open: true,
      proxy: {
        '/xizi-api': {
          pathRewrite: {'^/xizi-api': ''},
          target: 'http://119.45.162.104/xizi-api',
          // target: 'http://123.60.52.140/xizi-api',
          ws: true,
          secure: false,
          changOrigin: true
        }
      }
    },
    chainWebpack: config => {
      config.plugins.delete('prefetch')
      config.externals({
        vue:'Vue',
        'vue-router':'VueRouter',
        'element-ui':'ELEMENT',
        nprogress: 'NProgress',
        axios: 'axios'
      })
    }
  }