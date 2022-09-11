import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import { less } from 'svelte-preprocess-less';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      customElement: true,
    },
    // https://github.com/WICG/webcomponents/issues/829
    // 编译webcomponent的时候，开启hmr报错
    hot: false,
  })]
})
