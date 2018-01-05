"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const tinypng_io_1 = require("./tinypng-io");
const path = require("path");
const validExts = ['.jpg', '.jpeg', '.png'];
function processTinyPngErrorProxy(fileName) {
    return (proxyFunc) => {
        try {
            return proxyFunc();
        }
        catch (err) {
            cli_1.tinypngErrorLogger({
                fileName,
                errorMessage: JSON.stringify(err)
            });
        }
    };
}
function processTinyPng(content, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = file.relative;
        const ext = path.extname(file.path).toLowerCase();
        const proxy = processTinyPngErrorProxy(fileName);
        return yield proxy(() => __awaiter(this, void 0, void 0, function* () {
            if (!~validExts.indexOf(ext)) {
                throw { message: `tinypng only support png or jp(e)g. unexpected format = ${ext}` };
            }
            const uploadResponse = yield tinypng_io_1.default.upload({ content });
            const targetDownloadUrl = uploadResponse.output.url;
            const result = yield tinypng_io_1.default.download(targetDownloadUrl);
            cli_1.tinypngLogger({
                fileName,
                beforeSize: uploadResponse.input.size,
                afterSize: uploadResponse.output.size
            });
            return result;
        }));
    });
}
exports.default = processTinyPng;
//# sourceMappingURL=index.js.map