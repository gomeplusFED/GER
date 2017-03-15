/**
 * @author zdongh
 * @fileoverview report tests
 * @date 2017/03/03
 */

import GER from '../src';
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const error_report = new GER( {
    url: 'http://127.0.0.1:8888/report/add',
    delay: 1000,
    proxyModules: true
} );
export default () => {
    describe( 'GER', () => {
        describe( 'GER get', () => {
            it( 'should return the Object realy type  is string', () => {
                expect( error_report.get( 'url' ) ).to.be.an( 'string' );
                assert.equal( error_report.get( 'url' ), 'http://127.0.0.1:8888/report/add' );
            } );
            it( 'should return the Object realy type  is number', () => {
                expect( error_report.get( 'delay' ) ).to.be.an( 'number' );
                assert.equal( error_report.get( 'delay' ), 1000 );
            } );
        } );
        describe( 'GER set', () => {
            it( 'should return the Object realy type  is  string', () => {
                expect( error_report.set( 'url', 'yyyyyyy' ) ).to.be.an( 'string' );
                assert.equal( error_report.set( 'url', 'xxxx' ), 'xxxx' );
            } );
            it( 'should return the Object realy type  is number', () => {
                expect( error_report.set( 'delay', 10000 ) ).to.be.an( 'number' );
                assert.equal( error_report.set( 'delay', 1000 ), 1000 );
            } );
        } );
        describe( 'GER on', () => {
            it( 'should return the Object realy type  is  array', () => {
                expect( error_report.on( 'test', function () {} ) ).to.be.an( 'array' );
                expect( error_report.on( 'test', function () {} ) ).to.have.length.above( 1 );
                expect( error_report.on( 'test', function () {} ) ).to.have.length.within( 0, 3 );
            } );
        } );
        describe( 'GER off', () => {
            it( 'should return the Object realy type  is  undefined', () => {
                expect( error_report.off( 'test1' ) ).to.be.an( 'undefined' );
            } );
        } );
        describe( 'GER trigger', () => {
            it( 'should return the Object realy type  is  bol', () => {
                assert.equal( error_report.trigger( 'test' ), true );
                assert.equal( error_report.trigger( 'test2' ), false );
            } );
        } );
        describe( 'GER setItem', () => {
            it( 'should return string like {"msg":"1111"}', () => {
                assert.equal( error_report.setItem( {
                    msg: '1111'
                } ), '{"msg":"1111"}' );
            } );
            it( 'should return the Object realy type  is  string', () => {
                expect( error_report.setItem( {
                    msg: '1111'
                } ) ).to.be.an( 'string' );
            } );
        } );
        describe( 'GER clear', () => {
            it( 'should return undefined', () => {
                assert.equal( error_report.clear(), undefined );
            } );
        } );

        describe( 'GER info', () => {
            it( 'incoming msg(string) should return an error object', () => {
                expect( error_report.info( 'msgmsg' ) ).to.be.an( 'object' );
                expect( error_report.info( 'msgmsg' ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo' );
            } );
            it( 'incoming msgError(object) return an error object', () => {
                let errorObj = {
                    'msg': 'objectMsg',
                    'targetUrl': 'aaa.js',
                    'rowNo': 1,
                    'colNo': 2
                };
                expect( error_report.info( errorObj ) ).to.be.an( 'object' );
                expect( error_report.info( errorObj ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo' );
            } );
        } );
        describe( 'GER repeat', () => {
            it( 'should return repeat number equal 2', () => {
                error_report.set( 'repeat', 2 );
                assert.equal( true, error_report.repeat( {
                    msg: 'msgmsg',
                    level: 2
                } ) );
            } );
            it( 'should return repeat number not equal 2', () => {
                error_report.repeat( {
                    msg: 'msgmsg',
                    level: 2
                } )
                error_report.set( 'repeat', 2 );
                assert.equal( true, error_report.repeat( {
                    msg: 'msgmsg',
                    level: 2
                } ) );
            } );
        } );
        describe( 'GER report', () => {
            it( 'should return an string', () => {
                expect( error_report.report() ).to.be.an( 'string' );
            } );
        } );
        describe( 'GER carryError', () => {
            it( 'should return an array', () => {
                expect( error_report.carryError( {
                    msg: 'msg'
                } ) ).to.be.an( 'array' );
            } );
            it( 'should return an array', () => {
                var len = error_report.errorQueue.length;
                expect( error_report.carryError( {
                    msg: 'msg'
                } ) ).to.have.length.above( len );
            } );
        } );
        describe( 'GER handleMsg', () => {
            it( 'should return an object', () => {
                expect( error_report.handleMsg( 'sss', 'error', 4 ) ).to.be.an( 'object' );
            } );
            it( 'should return well have any keys', () => {
                expect( error_report.handleMsg( 'sss', 'error', 4 ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg' );
            } );
        } );
        describe( 'GER handleMsg', () => {
            it( 'should return an object', () => {
                expect( error_report.handleMsg( 'sss', 'error', 4 ) ).to.be.an( 'object' );
            } );
            it( 'should return well have any keys', () => {
                expect( error_report.handleMsg( 'sss', 'error', 4 ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg' );
            } );
        } );
        describe( 'GER proxy', () => {
            it( 'proxyCustomFn', () => {
                const spyCustomFun = function () {
                    throw "errorTest1";
                };
                proxyCustomFun = error_report.proxyCustomFn( spyCustomFun )
                expect( proxyCustomFun ).to.be.an( 'function' );

            } );
            it( 'proxyCustomObj', () => {
                const spyCustomFn1 = function () {
                    throw "errorTest1";
                };
                const proxyCustomFns = error_report.proxyCustomObj( {
                    proxyCustomFn: spyCustomFn1
                } )
                expect( proxyCustomFns ).to.be.an( 'object' );
                expect( proxyCustomFns.proxyCustomFn ).to.be.an( 'function' );
            } );
            it( 'proxyModules', () => {
                var _cb;
                window.define = function ( name, cb ) {
                    if ( _cb ) {
                        _cb();
                    } else {
                        _cb = cb;
                    }
                };
                window.define.amd = true;

                define( "testDefine", function () {
                    throw "testDefine";
                } );
                expect( define ).to.be.an( 'function' );
            } );
        } );
    } );
}