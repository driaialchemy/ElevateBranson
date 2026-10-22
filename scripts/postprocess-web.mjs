// Run after `expo export -p web`: adds the phone frame, demo banner, and mobile meta tags to dist/index.html.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../dist/index.html', import.meta.url);
let html = readFileSync(file, 'utf8');

html = html.replace(/<meta name="viewport"[^>]*>/, '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />');
const head = `
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#174A5B" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Elevate" />
    <meta name="description" content="Demo preview of the Elevate Branson app." />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <style id="demo-frame">
      html, body { height: 100%; margin: 0; }
      body { background: #E7EEEF; overflow: hidden; }
      #phone { display: flex; flex-direction: column; height: 100%; width: 100%; background: #F3F6F6; position: relative; transform: translateZ(0); overflow: hidden; }
      #root { flex: 1 1 auto; min-height: 0; height: auto; }
      #demo-banner { flex: none; display: flex; align-items: center; justify-content: center; gap: 12px; background: #174A5B; color: #fff; font: 600 14px/1.3 system-ui, sans-serif; padding: calc(6px + env(safe-area-inset-top)) 12px 6px; }
      #demo-banner button { background: transparent; border: 1px solid #fff; color: #fff; border-radius: 6px; min-width: 44px; min-height: 28px; font: inherit; cursor: pointer; }
      @media (min-width: 768px) {
        body { display: flex; align-items: center; justify-content: center; background: #D5DEE0; }
        #phone { width: 390px; height: min(844px, calc(100% - 32px)); border-radius: 36px; box-shadow: 0 20px 60px rgba(23, 74, 91, 0.35); border: 8px solid #174A5B; box-sizing: content-box; max-height: 844px; }
      }
    </style>`;
html = html.replace('</head>', `${head}\n  </head>`);
html = html.replace('<div id="root"></div>', `<div id="phone">
      <div id="demo-banner" role="note"><span>Demo preview. Forms, push, and live events are not connected.</span><button type="button" aria-label="Dismiss the demo preview banner" onclick="this.parentNode.remove()">Close</button></div>
      <div id="root"></div>
    </div>`);
writeFileSync(file, html);
console.log('dist/index.html updated');
