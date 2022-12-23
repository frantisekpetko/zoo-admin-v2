import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
//import viteCompression from 'vite-plugin-compression';
//import { ViteMinifyPlugin } from 'vite-plugin-minify';
//import compressPlugin from 'vite-plugin-compression';
/*

   ViteMinifyPlugin({}), 
        viteCompression(),
        compressPlugin({
            ext: '.br',
            algorithm: 'brotliCompress',
        })
        //viteCompression({ algorithm: 'gzip', deleteOriginFile: true })
*/

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4000
    },
    preview: {
        port: 5000
    },
    plugins: [
        react()

    ],
    resolve: {
        alias: [{ find: 'src', replacement: '/src' }],
    },

})
