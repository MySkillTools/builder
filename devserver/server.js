const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 8000;

// Proxy requests from the frontend to localhost:3000
app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
}));

// Proxy requests from the api backend to localhost:5000
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000/',
    changeOrigin: true,
}));

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});