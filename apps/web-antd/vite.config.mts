import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api/kit': {  // 修改这里，匹配完整前缀
    target: 'https://result.eolink.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/kit/, ''), // 移除 /api/kit
  },
          '/api': {  // 保留原有配置
            target: 'http://localhost:5320/api',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          }
        }
      },
    },
  };
});


    