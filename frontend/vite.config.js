import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6900/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // '/api': 'http://localhost:6900/api/v1',
    },
  },
});
/****
 * The request actually goes to http://localhost:5173/api/v1/
 * where as the route should the one with port 6900 then why does this happen i think since proxy is intermediate server what basically happens is the proxy server has the origin as one with port 6900 and that proxy server communicates with the actual server and the request from 5173 goes to the proxy and proxy returns the response to the 5173
 *
 */
