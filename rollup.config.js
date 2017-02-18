import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from "rollup-plugin-commonjs";

const isProduction = process.env.NODE_ENV === 'production';

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'GER',
    plugins: [
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['es2015-rollup', 'stage-0'],
            plugins: ['transform-class-properties']
        }), (isProduction && uglify())
    ],
    dest: isProduction ? 'dist/ger.min.js' : 'dist/ger.js'
};
