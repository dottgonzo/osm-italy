const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const OSM_URI = process.env.OSM_URI || "https://proxy.geo.kernel.online/osm"
const NOMINATIM_URI = process.env.NOMINATIM_URI || "https://proxy.geo.kernel.online/nominatim"
const PERMANENT_TOKEN = process.env.PERMANENT_TOKEN

const JWT_SECRET = process.env.JWT_SECRET || 'testsecretjwt'

app.use('*', (req, res, next) => {

  const authorization = req.headers['authorization']
  if (!authorization) return next(new Error('no access token provided'))
  if (PERMANENT_TOKEN && authorization === PERMANENT_TOKEN) return next()
  jwt.verify(authorization, JWT_SECRET, { maxAge: "2 days" }, function (err, decoded) {
    if (err) next(err)
    next()
  });
})
app.get('/token', (req, res) => {
  const token = jwt.sign({}, JWT_SECRET, { expiresIn: "2 days" });
  res.json({ token })
});
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