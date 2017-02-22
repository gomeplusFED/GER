/**
 * @author xiaojue
 * @fileoverview utils tests
 * @date 20170215
 */

import utils from '../src/lib/utils';
const assert = chai.assert;
const expect = chai.expect;
export default () => {

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
        describe( 'utils serializeObj', () => {
            it( 'should return the Object to String like a=1&b=1&', () => {
                assert.equal( utils.serializeObj( {
                    a: 1,
                    b: 1
                } ), "a=1&b=1&" );
            } );
        } );
        describe( 'utils stringify', () => {
            it( 'should return the Object to String', () => {
                assert.equal( utils.stringify( {
                    a: 1,
                    b: 1
                } ), '{"a":1,"b":1}' );
                assert.equal( utils.stringify( {
                    a: "1",
                    b: "1"
                } ), '{"a":"1","b":"1"}' );
            } );
        } );
        describe( 'utils parse', () => {
            it( 'should return the String to Object', () => {
                expect( utils.parse( '{"a":1,"b":1}' ) ).to.have.all.keys( 'a', 'b' );
                expect( utils.parse( '{"a":1,"b":1}' ) ).to.be.a( 'object' );
            } );
        } );
        describe( 'utils getServerPort', () => {
            it( 'should return the String', () => {
                expect( utils.getServerPort() ).to.be.a( 'string' );
                expect( parseInt( utils.getServerPort(), 10 ) ).to.be.a( 'number' );
            } );
        } );
        describe( 'utils getUserAgent', () => {
            it( 'should return the String', () => {
                expect( utils.getUserAgent() ).to.be.a( 'string' );
            } );
        } );
        describe( 'utils getPlatType', () => {
            it( 'should return the String like Mobild/PC', () => {
                expect( utils.getPlatType() ).to.be.a( 'string' );
            } );
        } );
        describe( 'utils flashVer', () => {
            it( 'should return the String', () => {
                expect( utils.flashVer() ).to.be.a( 'string' );
            } );
        } );
        describe( 'utils getReferer', () => {
            it( 'should return the String', () => {
                expect( utils.getReferer() ).to.be.a( 'string' );
            } );
        } );
        describe( 'utils getSystemParams', () => {
            it( 'should return the Object', () => {
                expect( utils.getSystemParams() ).to.be.a( 'object' );
                expect( utils.getSystemParams() ).to.have.any.keys( 'timestamp', 'referer' );
            } );
        } );
        describe( 'utils toArray', () => {
            it( 'should return the Array', () => {
                expect( utils.toArray( [ 1, 2, 3, 4 ] ) ).to.be.a( 'array' );
                expect( utils.toArray( [ 1, 2, 3, 4 ] ) ).to.have.length.above( 3 );
                expect( utils.toArray( [ 1, 2, 3, 4 ] ) ).to.have.length.within( 0, 4 );
            } );
        } );
        describe( 'utils getCookie', () => {
            it( 'should return the string', () => {
                document.cookie = 'testMocha=1234';
                expect( utils.getCookie( 'testMocha' ) ).to.be.a( 'string' );
                expect( utils.getCookie( 'testMocha' ) ).to.have.length.above( 3 );
                expect( utils.getCookie( 'testMocha' ) ).to.have.length.within( 0, 4 );
                assert.equal( utils.getCookie( 'testMocha' ), '1234' );
            } );
        } );
        describe( 'utils addCookie', () => {
            it( 'should return the string', () => {
                expect( utils.addCookie( 'testMocha', '5678' ) ).to.be.a( 'string' );
                expect( utils.addCookie( 'testMocha2', '5678' ) ).to.have.length.above( 3 );
                expect( utils.addCookie( 'testMocha3', '5678' ) ).to.have.length.within( 0, 4 );
                assert.equal( utils.addCookie( 'testMocha', '5678' ), '5678' );
                assert.equal( utils.addCookie( 'testMocha1', '567822', -2 ), '' );
            } );
        } );
        describe( 'utils clearCookie', () => {
            it( 'should return the string', () => {
                expect(utils.clearCookie('testMocha1')).to.be.a('string');
                assert.equal( utils.clearCookie('testMocha3'), '' );
            } );
        } );

    } );

}