const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/data', {
      // proxy할 주소, 즉, 백단의 주소를 적어줍니다.
      target: 'http://openapi.jeonju.go.kr',
      changeOrigin: true,
      pathRewrite: {
        '/data': '',
      },
    })
  );
};
