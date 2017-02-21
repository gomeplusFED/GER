/**
 * @author suman
 * @fileoverview localStorage tests
 * @date 2017/02/21
 */

import chai from 'chai';
import localStorage from '../src/lib/localStorage';
const assert = chai.assert;
const expect = chai.expect;
describe( '上报错误---localStorage', () => {
    // getItem
    describe( 'localStorage getItem 方法测试', () => {
        it( '传入一个errorLSSign 字符串 应该 返回一个error object', () => {
            assert.equal( true, localStorage.getItem());
        });
        it( '传入一个object 这里应该处理后返回一个error object', () => {
            assert.equal();
        });

    });
});