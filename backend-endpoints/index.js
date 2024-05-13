// index.js

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { exec } = require('child_process');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/speed' && req.method === 'POST') {
      exec(`fast --upload --json`, (err, stdout, stderr) => {
        if (err || stderr) {
          return res.status(400).json({ error: err, code: 400 });
        }
        const result = JSON.parse(stdout);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ code: 200, data: result });
      });
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
