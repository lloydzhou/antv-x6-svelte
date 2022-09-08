import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

export default {
  // This `main.js` file we wrote
  input: 'src/lib/index.js',
  output: {
    file: 'dist/x6tag.js',
    format: 'umd',
    name: 'x6tag',
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss(),
    svelte({
      // Tell the svelte plugin where our svelte files are located
      include: 'src/**/*.svelte',
      compilerOptions: {
        customElement: true,
      }
    }),
    terser(),
    filesize(),
  ],
  external: [
    "@antv/x6",
  ]
};
