"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("../../libs/cli");
/**
 * Created by allen on 2016/11/13.
 */
describe('cli', () => {
    describe(`tinypngLogger`, () => {
        it('parameter(s) <{fileName: Test, beforeSize: null, afterSize: null}> should pass', () => {
            cli_1.tinypngLogger({
                fileName: 'Test',
                beforeSize: null,
                afterSize: null
            });
        });
        it('parameter(s) <normal case> should pass', () => {
            cli_1.tinypngLogger({
                fileName: 'Test',
                beforeSize: 10,
                afterSize: 5
            });
        });
    });
    describe(`tinypngErrorLogger`, () => {
        it('parameter(s) <{fileName: Test, beforeSize: null, afterSize: null}> should pass', () => {
            cli_1.tinypngErrorLogger({
                fileName: 'Test',
                errorMessage: null
            });
        });
        it('parameter(s) <normal case> should pass', () => {
            cli_1.tinypngErrorLogger({
                fileName: 'Test',
                errorMessage: 'unable to connect server',
            });
        });
    });
});
//# sourceMappingURL=cli.spec.js.map