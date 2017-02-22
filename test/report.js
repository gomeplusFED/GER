/**
 * @author suman
 * @fileoverview report tests
 * @date 2017/02/21
 */

import report from '../src/lib/report';
const assert = chai.assert;
export default () => {

    describe( 'my report', () => {
        describe( 'report info', () => {
            it( 'should return the Object realy type', () => {
                assert.equal( true, report.info( 'abc', 'String' ) );
            } );
        } );
    } );
}