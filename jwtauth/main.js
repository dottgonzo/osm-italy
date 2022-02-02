const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const OSM_URI = process.env.OSM_URI || "https://proxy.geo.kernel.online/osm"
const NOMINATIM_URI = process.env.NOMINATIM_URI || "https://proxy.geo.kernel.online/nominatim"

const JWT_SECRET = process.env.JWT_SECRET || 'testsecretjwt'

app.use('*', (req, res, next) => {
  const authorization = req.headers['authorization']
  jwt.verify(authorization, JWT_SECRET, function (err, decoded) {
    if (err) next(err)
    next()
  });
})

app.use('/nominatim', createProxyMiddleware({
  target: NOMINATIM_URI,
  changeOrigin: true,
  pathRewrite: {
    [`^/nominatim`]: '',
  }
}));
app.use('/osm', createProxyMiddleware({
  target: OSM_URI,
  changeOrigin: true,
  pathRewrite: {
    [`^/osm`]: '',
  },
}));

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});