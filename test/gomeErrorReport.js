/**
 * @author zdongh
 * @fileoverview report tests
 * @date 2017/03/03
 */

import GER from '../src';
const assert = chai.assert;
const expect = chai.expect;
const error_report = new GER({
    url:'xxxx',
    delay: 5000,
    proxyCustom:[]
});
export default () => {
    describe( 'GER', () => {
        describe( 'GER get', () => {
            it( 'should return the Object realy type  is string', () => {
                expect( error_report.get( 'url' ) ).to.be.an( 'string' );
                assert.equal( error_report.get('url'), 'xxxx' );
            } );
            it( 'should return the Object realy type  is number', () => {
                expect( error_report.get( 'delay' ) ).to.be.an( 'number' );
                assert.equal( error_report.get('delay'), 5000 );
            } );
            it( 'should return the Object realy type  is array', () => {
                expect( error_report.get( 'proxyCustom' ) ).to.be.an( 'array' );
            } );
        } );
        describe( 'GER set', () => {
            it( 'should return the Object realy type  is  string', () => {
                expect( error_report.set( 'url', 'yyyyyyy' ) ).to.be.an( 'string' );
                assert.equal( error_report.set('url', 'xxxx'), 'xxxx' );
            } );it( 'should return the Object realy type  is number', () => {
                expect( error_report.set( 'delay', 10000 ) ).to.be.an( 'number' );
                assert.equal( error_report.set('delay', 5000 ), 5000 );
            } );
        } );
        describe( 'GER on', () => {
            it( 'should return the Object realy type  is  array', () => {
                expect( error_report.on( 'test', function(){} ) ).to.be.an( 'array' );
                expect( error_report.on( 'test', function(){} ) ).to.have.length.above( 1 );
                expect( error_report.on( 'test', function(){} ) ).to.have.length.within( 0, 3 );
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
    } );
}