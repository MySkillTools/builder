import open from 'open';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 8000;

// Proxy requests from the api backend to localhost:5000 [Put this first!]
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000/',
    changeOrigin: true,
}));

// Proxy requests from the frontend to localhost:3000
app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
}));

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});

open('http://localhost:8000')
    .then(() => {
        console.log('URL opened in default browser');
    })
    .catch(err => {
        console.error('Error opening URL:', err);
    });