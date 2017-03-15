import babel from 'rollup-plugin-babel';
import commonjs from "rollup-plugin-commonjs";

const isProduction = process.env.NODE_ENV === 'production';

export default {
    entry: 'test/index.js',
    format: 'iife',
    moduleName: 'GER',
    useStrict: false,
    plugins: [
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['es2015-rollup', 'stage-0'],
            plugins: ['transform-class-properties']
        })
    ],
    dest: 'test/tests.js'
};
