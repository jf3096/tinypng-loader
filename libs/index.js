"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const tinyPng_1 = require('./tinyPng');
const cli_1 = require('./cli');
/**
 * Created by allen on 2016/11/9.
 */
function processTinyPng(contents, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            const uploadResponse = yield tinyPng_1.default.upload(contents);
            const targetDownloadUrl = uploadResponse.output.url;
            result = yield tinyPng_1.default.download(targetDownloadUrl);
            cli_1.tinypngLogger({
                fileName,
                beforeSize: uploadResponse.input.size,
                afterSize: uploadResponse.output.size
            });
        }
        catch (err) {
            cli_1.tinypngErrorLogger({
                fileName,
                errorMessage: JSON.stringify(err)
            });
        }
        return result;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processTinyPng;
//# sourceMappingURL=index.js.map