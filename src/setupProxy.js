/* eslint-disable @typescript-eslint/no-var-requires */
const proxy = require('http-proxy-middleware')
const target = process.env['DEV_PROXY_HOST']

module.exports = function(app) {
  if (target) {
    app.use(proxy('/api', { target, changeOrigin: true }))
  }
}
