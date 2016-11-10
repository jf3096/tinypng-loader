"use strict";
const utils_1 = require('../../libs/utils');
const chai_configuration_1 = require('../chai-configuration');
/**
 * Created by allen on 2016/11/3.
 */
describe('utils', () => {
    describe('string2Uint8array', () => {
        it('parameter(s) <hello> should derive return <null>', () => {
            const input = `hello`;
            chai_configuration_1.expect(utils_1.string2Uint8array(input)).to.be.eqls({ "0": 104, "1": 101, "2": 108, "3": 108, "4": 111 });
        });
        it('parameter(s) <null> should derive return <null>', () => {
            const input = null;
            chai_configuration_1.expect(utils_1.string2Uint8array(input)).to.be.null;
        });
        it('parameter(s) <undefined> should derive return <undefined>', () => {
            const input = undefined;
            chai_configuration_1.expect(utils_1.string2Uint8array(input)).to.be.null;
        });
        it('parameter(s) <0> should derive return <null>', () => {
            const input = 0;
            chai_configuration_1.expect(() => utils_1.string2Uint8array(input)).to.throw(`utils: unknown parameter type. expect parameter to be string`);
        });
        it('parameter(s) <""> should derive return <"">', () => {
            const input = "";
            chai_configuration_1.expect(utils_1.string2Uint8array(input)).to.be.null;
        });
        it('parameter(s) <[]> should derive to throw', () => {
            const input = [];
            chai_configuration_1.expect(() => utils_1.string2Uint8array(input)).to.be.throw(`utils: unknown parameter type. expect parameter to be string`);
        });
        it('parameter(s) <false> should derive to throw', () => {
            const input = false;
            chai_configuration_1.expect(() => utils_1.string2Uint8array(input)).to.be.throw(`utils: unknown parameter type. expect parameter to be string`);
        });
    });
    describe('uint8array2String', () => {
    });
});
//# sourceMappingURL=utils.spec.js.map