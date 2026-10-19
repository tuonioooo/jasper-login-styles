const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
function option(name, fallback) {
  const position = args.indexOf(name);
  if (position === -1) return fallback;
  if (!args[position + 1] || args[position + 1].startsWith('--')) {
    throw new Error(`Missing value for ${name}`);
  }
  return args[position + 1];
}
const port = Number(option('--port', process.env.PORT || '8896'));
const host = option('--host', '127.0.0.1');
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Port must be an integer from 1 to 65535');

const publicFiles = new Set([
  'index.html', 'app.js', 'styles.css',
  'vendor/react.js', 'vendor/react-dom.js', 'vendor/dayjs.js', 'vendor/antd.js', 'vendor/reset.css',
]);
for (const filename of publicFiles) {
  if (!fs.existsSync(path.join(__dirname, filename))) {
    console.error(`Missing ${filename}. Run npm run setup first.`);
    process.exit(1);
  }
}
const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8'};
const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, {Allow: 'GET, HEAD'});
    response.end();
    return;
  }
  let filename;
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    filename = pathname === '/' ? 'index.html' : pathname.slice(1);
  } catch {
    response.writeHead(400);
    response.end('Invalid URL');
    return;
  }
  if (!publicFiles.has(filename)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  const stream = fs.createReadStream(path.join(__dirname, filename));
  stream.on('error', () => {
    if (!response.headersSent) response.writeHead(500);
    response.end('Unable to read file');
  });
  response.writeHead(200, {'Content-Type': types[path.extname(filename)], 'Cache-Control': 'no-store'});
  if (request.method === 'HEAD') {
    stream.destroy();
    response.end();
  } else {
    stream.pipe(response);
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is already in use. Try npm start -- --port 8897.`
    : error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  console.log(`Jasper login styles: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/`);
  console.log('Press Ctrl+C to stop.');
});
