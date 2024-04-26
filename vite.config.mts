import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000, // 서버 포트 번호 변경
  },
  build: {
    outDir: 'build', // build 폴더명 변경
  },
});
