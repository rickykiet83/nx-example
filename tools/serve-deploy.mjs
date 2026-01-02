import handler from 'serve-handler';
import http from 'http';

const port = 4400;

http
  .createServer((req, res) => {
    console.log('➡️ ', req.method, req.url);

    // normalize /cart -> /cart/
    if (req.url === '/cart') {
      res.statusCode = 301;
      res.setHeader('Location', '/cart/');
      res.end();
      return;
    }

    return handler(req, res, {
      public: 'dist/deploy',
      cleanUrls: false,
      rewrites: [
        // ✅ IMPORTANT: no leading slash for serve-handler patterns
        { source: 'cart', destination: '/cart/index.html' },
        { source: 'cart/', destination: '/cart/index.html' },
        { source: 'cart/**', destination: '/cart/index.html' },

        // ✅ everything else -> products
        { source: '**', destination: '/index.html' },
      ],
    });
  })
  .listen(port, () => console.log(`✅ http://localhost:${port}`));
