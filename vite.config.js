import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { less } from 'svelte-preprocess-less';



// https://vitejs.dev/config/
// export default defineConfig((({ command }) => {
//   if (command == 'serve') {
//     return {
//       plugins: [svelte({
//         compilerOptions: {
//           customElement: true,
//         }
//       })]
//     }
//   }
// })
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      customElement: true,
    },
  })]
})
