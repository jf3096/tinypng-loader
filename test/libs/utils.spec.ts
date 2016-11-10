import {string2Uint8array} from '../../libs/utils';
import {expect} from '../chai-configuration';
import tinyPng from '../../libs';
/**
 * Created by allen on 2016/11/3.
 */

describe('utils', () => {
    describe('string2Uint8array', () => {
        it('parameter(s) <hello> should derive return <null>', () => {
            const input = `hello`;
            expect(string2Uint8array(input)).to.be.eqls({"0": 104, "1": 101, "2": 108, "3": 108, "4": 111});
        });
        it('parameter(s) <null> should derive return <null>', () => {
            const input = null;
            expect(string2Uint8array(input)).to.be.null;
        });
        it('parameter(s) <undefined> should derive return <undefined>', () => {
            const input = undefined;
            expect(string2Uint8array(input)).to.be.null;
        });
        it('parameter(s) <0> should derive return <null>', () => {
            const input = 0;
            expect(() => string2Uint8array(input as any)).to.throw(`utils: unknown parameter type. expect parameter to be string`);
        });
        it('parameter(s) <""> should derive return <"">', () => {
            const input = "";
            expect(string2Uint8array(input)).to.be.null;
        });
        it('parameter(s) <[]> should derive to throw', () => {
            const input = [];
            expect(() => string2Uint8array(input as any)).to.be.throw(`utils: unknown parameter type. expect parameter to be string`);
        });
        it('parameter(s) <false> should derive to throw', () => {
            const input = false;
            expect(() => string2Uint8array(input as any)).to.be.throw(`utils: unknown parameter type. expect parameter to be string`);
        });
    });

    describe('uint8array2String', () => {
    });
});