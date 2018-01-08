import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from "rollup-plugin-commonjs";
import resolve from 'rollup-plugin-node-resolve';
var config = {
    entry: process.env.entry,
    format: 'umd',
    useStrict: false,
    moduleName: 'GER',
    external:['chai'],
    globals:{
        chai:'chai' 
    },
    plugins: [
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['es2015-rollup', 'stage-0'],
            plugins: ['transform-class-properties']
        }),
          resolve({
            jsnext: true,
            main: true
          })
    ],
    dest: process.env.dest
};

if (process.env.uglify) {
    config.plugins.push(uglify());
}

export default config;
