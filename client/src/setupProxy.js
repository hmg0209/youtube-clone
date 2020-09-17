const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const target =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://stormy-journey-41513.herokuapp.com';
  app.use(
    '/api',

    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
