const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 8080;

// Proxy requests from / to localhost:3000
app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/', // Rewrite URL path (you may adjust based on your needs)
    },
}));

// Proxy requests from /api to localhost:5000/api
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000/api',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/', // Rewrite URL path (you may adjust based on your needs)
    },
}));

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
