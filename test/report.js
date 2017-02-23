/**
 * @author suman
 * @fileoverview report tests
 * @date 2017/02/21
 */

import report from '../src/lib/report';
const assert = chai.assert;
const expect = chai.expect;
const Report = new report();
export default ()=>{

    describe( 'lib/report', () => {
        // 'log', 'debug', 'info', 'warn', 'error' 这些方法 怎么证明?
        describe( 'report info', () => {

            it( 'incoming msg(string) should return an error object', () => {
                expect( Report.info('msgmsg') ).to.be.an('object');
                expect( Report.info('msgmsg') ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo');
            });
            it( 'incoming msgError(object) return an error object', () => {
                let errorObj = {
                    'msg' : 'objectMsg',
                    'targetUrl' : 'aaa.js',
                    'rowNo' : 1,
                    'colNo' : 2
                };
                expect( Report.info( errorObj ) ).to.be.an('object');
                expect( Report.info( errorObj ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo');
            });

        });

        // repeat
        describe( 'report repeat', () => {
            it( 'incoming an errorObject should return true', () => {
                let errorObj = {
                    'msg' : 'objectMsg',
                    'targetUrl' : 'bbb.js',
                    'rowNo' : 10,
                    'colNo' : 20
                };
                expect( Report.repeat( errorObj ) ).to.be.an('object');
                expect( Report.info( errorObj ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo');

            });

            it( 'incoming an errorObject should return false', () => {
                assert.equal();
            });

        });

        // report
        describe( 'report report', () => {
            it( 'incoming an cb ', () => {
                assert.equal();
            });

        });

        // carryError
        describe( 'report carryError', () => {
            it( 'incoming an errorObject ', () => {
                assert.equal();
            });

        });

        // handleMsg
        describe( 'report handleMsg', () => {
            it( 'incoming an errorObject ', () => {
                assert.equal( true , report.handleMsg() );
            });

        });
    });
}
