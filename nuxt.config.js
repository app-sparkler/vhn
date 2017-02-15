const webpack = require('webpack')

module.exports = {
  /*
  * LOADING
  */
  loading: false,
  /*
  * PLUGINS
  */
  plugins: [
    '~plugins/filters',
    '~plugins/vuex-router-sync.js'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS assets
  */
  css: [
    '~assets/css/main.css',
    { lang: 'less', src: '~assets/less/bootstrap.less' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  // WEBPACK - BUILD
  build: {
    vendor: [ 'jquery', 'bootstrap', 'firebase/app', 'firebase/database', 'immutable', 'moment' ],
    // PLUGINS
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery'
      })
    ],
    // EXTEND
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // ROUTER CONFIGURATION
  router: {
    linkActiveClass: 'active',
    base: '/'
  }
}
