/**
 * @author suman
 * @fileoverview localStorage tests
 * @date 2017/02/21
 */

import localStorage from '../src/lib/localStorage';
const assert = chai.assert;
const expect = chai.expect;
export default () => {
    describe( 'lib/localStorage', () => {
        // getItem
        describe( 'localStorage getItem', () => {
            it( 'incoming errorLSSign should return an object', () => {
                assert.equal( true, localStorage.getItem() );
            } );
            it( 'incoming object should return an object', () => {
                assert.equal();
            } );

        } );


    } );
}