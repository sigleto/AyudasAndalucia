// Local-only server for testing the exported production web application.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve('.validation/web-test');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.ico': 'image/x-icon', '.ttf': 'font/ttf' };
http.createServer((request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let target = path.resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    if (!path.extname(target)) target = path.join(root, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) { response.writeHead(404).end(); return; }
    response.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
    fs.createReadStream(target).pipe(response);
  } catch { response.writeHead(400).end(); }
}).listen(8082, '127.0.0.1', () => console.log('Production test server: http://127.0.0.1:8082'));
