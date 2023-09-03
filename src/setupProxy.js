const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/login', '/register', '/shows'],
    createProxyMiddleware({
      target: 'http://localhost:5000', 
      changeOrigin: true,
    })
  );
};
