/* global process, console */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';

const directory = fileURLToPath(new URL('.', import.meta.url));
const publicFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/script.js', ['script.js', 'text/javascript; charset=utf-8']],
  ['/assets/marca.svg', ['assets/marca.svg', 'image/svg+xml']],
  ['/assets/rios.svg', ['assets/rios.svg', 'image/svg+xml']],
  [
    '/dados/exemplo-extracao.json',
    ['dados/exemplo-extracao.json', 'application/json; charset=utf-8'],
  ],
  ['/dados/notas-do-projeto.txt', ['dados/notas-do-projeto.txt', 'text/plain; charset=utf-8']],
]);

// The same handler can be verified without opening a network socket.
export async function siteResponse(address, method = 'GET') {
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Cache-Control': 'no-cache',
  };
  if (method !== 'GET' && method !== 'HEAD') {
    return {
      status: 405,
      headers: { ...headers, Allow: 'GET, HEAD' },
      body: 'Método não permitido.',
    };
  }
  let entry;
  try {
    entry = publicFiles.get(decodeURIComponent(new URL(address, 'http://127.0.0.1').pathname));
  } catch {
    return { status: 400, headers, body: method === 'HEAD' ? undefined : 'Endereço inválido.' };
  }
  if (!entry) {
    return { status: 404, headers, body: method === 'HEAD' ? undefined : 'Página não encontrada.' };
  }
  const [filename, type] = entry;
  const body = await readFile(resolve(directory, filename));
  return {
    status: 200,
    headers: { ...headers, 'Content-Type': type, 'Content-Length': body.byteLength },
    body: method === 'HEAD' ? undefined : body,
  };
}

export function startAcademicSite(port = 4174) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('A porta precisa ser um número entre 1 e 65535.');
  }
  const server = createServer(async (request, response) => {
    try {
      const result = await siteResponse(request.url, request.method);
      response.writeHead(result.status, result.headers);
      response.end(result.body);
    } catch {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(
        'Não foi possível carregar o arquivo do site. Verifique a pasta site-academico.',
      );
    }
  });
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`A porta ${port} está ocupada. Use outra: npm run site -- ${port + 1}`);
    } else if (error.code === 'EPERM' || error.code === 'EACCES') {
      console.error(
        'Este ambiente bloqueou o servidor local. Execute npm run site no terminal do seu computador.',
      );
    } else {
      console.error(`Não foi possível iniciar o site: ${error.code || error.message}`);
    }
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(
      `\nNavega — site acadêmico\n\nAbra no navegador: http://127.0.0.1:${port}\n\nDisponível somente neste computador. Nada foi publicado.\nPara encerrar: Ctrl+C.\n`,
    );
  });
  const stop = () => server.close();
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
  return server;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    startAcademicSite(process.argv[2] === undefined ? 4174 : Number(process.argv[2]));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
