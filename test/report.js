/**
 * @author suman
 * @fileoverview report tests
 * @date 2017/02/21
 */

import report from '../src/lib/report';
const assert = chai.assert;
<<<<<<< HEAD
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
                //assert.equal();
                expect( Report.info({'msg' : 'objectmsg', 'targetUrl' : 'aaa.js', 'rowNo' : 1, 'colNo' : 2}) ).to.be.an('object');
                expect( Report.info({'msg' : 'objectmsg', 'targetUrl' : 'aaa.js', 'rowNo' : 1, 'colNo' : 2}) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo');
            });

        });

        // repeat
        describe( 'report repeat', () => {
            it( 'incoming an errorObject should return true', () => {
                assert.equal(true, Report.repeat());
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
=======
export default () => {

    describe( 'my report', () => {
        describe( 'report info', () => {
            it( 'should return the Object realy type', () => {
                assert.equal( true, report.info( 'abc', 'String' ) );
            } );
        } );
    } );
}
>>>>>>> 9ec1456281a129e891c810b3c2b72d030a5d1dd6
