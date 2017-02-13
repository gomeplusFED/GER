import babel from 'rollup-plugin-babel';
var commonjs = require("rollup-plugin-commonjs");

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName:'GER',
    plugins: [
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['es2015-rollup', 'stage-0'],
            plugins: ['transform-class-properties']
        })
    ],
    dest: 'dist/ger.js'
};
