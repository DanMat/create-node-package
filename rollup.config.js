import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import externals from 'rollup-plugin-node-externals';
import polyfill from 'rollup-plugin-polyfill';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

const resolvePlugin = resolve({
	mainFields: ['module', 'main'],
	extensions: ['.js', '.json'],
	preferBuiltins: true
});

const babelPlugin = babel({
	babelHelpers: 'runtime',
	skipPreflightCheck: true,
	extensions: ['.js'],
	// prevents babel from modifying sourcemap generated by rollup
	inputSourceMap: false
});

export default [
	/**
	 * CJS is short for CommonJS
	 * This would work for backend.
	 */
	// CJS
	{
		input: 'bin/cli.js',
		output: {
			file: 'dist/bundle.cjs.js',
			format: 'cjs',
			sourcemap: true,
			strict: false,
			banner: '#! /usr/bin/env node\n',
			exports: 'named'
		},
		plugins: [
			resolvePlugin,
			babelPlugin,
			/**
			 * Polyfill for listr which uses rxjs
			 */
			polyfill(['any-observable/register/rxjs']),
			json(),
			externals(),
			commonjs(),
			terser(),
			visualizer({
				filename: 'dist/bundle-visualizer-cjs.html'
			})
		],
		external: ['npm-registry-client']
	}
];
