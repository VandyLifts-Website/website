const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      
      logger: console,
      on: {
        proxyReq: (proxyReq, req, res) => {
          /* handle proxyReq */
          console.log("BEESECHURGER")
        },
        proxyRes: (proxyRes, req, res) => {
          /* handle proxyRes */
          console.log("BEESECHURGER")
        },
        error: (err, req, res) => {
          /* handle error */
          console.log("BEESECHURGER")
        },
    }    
    })
  );
  app.use(
    "/accounts",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      
    })
  );
};
