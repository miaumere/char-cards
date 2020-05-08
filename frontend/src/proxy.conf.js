const PROXY_CONFIG = [
  {
    "context": [
      "/api/",
      "/login",
      "/logout",
      "/relogin",
      "/story"
    ],
    "target": "http://localhost:8082",
    "secure": false
  }
]
module.exports = PROXY_CONFIG;
