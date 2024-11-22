import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    server: {
        port: 4000,
    },
    preview: {
        port: 5000,
    },
    plugins: [react()],
    resolve: {
        alias: [{ find: 'src', replacement: '/src' }],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '', // optional: global imports
                includePaths: [path.resolve(__dirname, 'node_modules')],
            },
        },
    },
});
