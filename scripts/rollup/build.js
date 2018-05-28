import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/main.js',
	output: [
		{
			file: 'dist/main.esm.js',
			format: 'es'
		},
		{
			file: `dist/main.iife.js`,
			format: 'iife',
			name: 'freshesBridge'
		}
	],
	plugins: [
		resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
		babel({
			plugins: [
				'external-helpers'
			]
		}),
		uglify({}, minify)
	],
	external: []
};