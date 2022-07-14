const PROXY_LOCAL_CONFIG = [
    {
        context: [ ],
        "target": "http://localhost:3001/",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": ""
        },
    }
  ]
  module.exports = PROXY_LOCAL_CONFIG;
  