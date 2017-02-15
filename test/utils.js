/**
 * @author xiaojue
 * @fileoverview utils tests
 * @date 20170215
 */

import chai from 'chai';
import utils from '../src/lib/utils';
const assert = chai.assert;
describe( 'lib/utils', () => {
    describe( 'utils typeDecide', () => {
        it( 'should return the Object realy type', () => {
            assert.equal( true, utils.typeDecide( 'abc', 'String' ) );
            assert.equal( true, utils.typeDecide( 123, 'Number' ) );
            assert.equal( true, utils.typeDecide( function () {}, 'Function' ) );
            assert.equal( true, utils.typeDecide( {
                a: 1
            }, 'Object' ) );
            assert.equal( true, utils.typeDecide( [ 1, 2 ], 'Array' ) );
        } );
    } );
} );