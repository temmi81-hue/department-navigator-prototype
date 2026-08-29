import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const siteRoot = process.cwd();
const knowledgeBasePath = join(siteRoot, '..', 'initial_department_knowledge_base.json');
const mimeTypes = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };

createServer(async (request, response) => {
  try {
    if (request.url === '/knowledge-base') {
      response.writeHead(200, { 'Content-Type': mimeTypes['.json'], 'Cache-Control': 'no-store' });
      response.end(await readFile(knowledgeBasePath));
      return;
    }
    const urlPath = request.url === '/' ? '/index.html' : request.url.split('?')[0];
    const filePath = normalize(join(siteRoot, urlPath));
    if (!filePath.startsWith(siteRoot)) throw new Error('Invalid path');
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream' });
    response.end(await readFile(filePath));
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(4173, () => console.log('규정 길잡이 테스트 화면: http://localhost:4173'));
