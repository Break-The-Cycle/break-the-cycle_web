const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/api/v1',
    createProxyMiddleware({
      target: 'http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/v1': '',
      },
    }),
  );
};