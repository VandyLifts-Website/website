//Copyright Joshua Payne and David Perez 2022

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:8000",
      changeOrigin: true,

      logger: console,
      on: {
        proxyReq: (proxyReq, req, res) => {
          /* handle proxyReq */
        },
        proxyRes: (proxyRes, req, res) => {
          /* handle proxyRes */
        },
        error: (err, req, res) => {
          /* handle error */
        },
      },
    })
  );
  app.use(
    "/accounts",
    createProxyMiddleware({
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
    })
  );
};
