/**
 * @author suman
 * @fileoverview report tests
 * @date 2017/02/21
 */

import chai from 'chai';
import report from '../src/lib/report';
const assert = chai.assert;
const expect = chai.expect;
describe( '上报错误---report', () => {
    // 'log', 'debug', 'info', 'warn', 'error' 这些方法 怎么证明通过与否?
    describe( 'report info 方法测试', () => {
        it( '传入一个msg字符串 应该 返回一个error object', () => {
            assert.equal( true, report.info());
            //expect(report.info()).to.be.equal();
        });
        it( '传入一个object 这里应该 返回一个error object', () => {
            assert.equal();
        });

    });

    // repeat
    describe( 'report repeat 是否重复上报 方法测试', () => {
        it( '传入一个errorObject 应该 返回一个true', () => {
            assert.equal(true, report.repeat());
        });

        it( '传入一个errorObject 应该 返回一个false', () => {
            assert.equal();
        });

    });

    // report
    describe( 'report report  上报 方法测试', () => {
        it( '传入一个cb ', () => {
            assert.equal();
        });

    });

    // carryError
    describe( 'report carryError push到缓存池', () => {
        it( '传入一个errorObject ', () => {
            assert.equal();
        });

    });

    // handleMsg
    describe( 'report handleMsg 封装error info log...方法', () => {
        it( '传入一个errorObject ', () => {
            assert.equal( true , report.handleMsg() );
        });

    });
});