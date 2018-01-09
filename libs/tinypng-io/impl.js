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
const axios_1 = require("axios");
const revalidator_1 = require("revalidator");
const path = require("path");
const fs = require("fs-extra-promise");
const tinypng_schema_1 = require("../schema/tinypng.schema");
class TinyPngIOImpl {
    upload({ content, filename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = yield TinyPngIOImpl.contentReader({ content, filename });
            const data = yield TinyPngIOImpl.requestForShrink(requestData);
            TinyPngIOImpl.validateUploadResponseData(data);
            return data;
        });
    }
    static requestForShrink(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default({
                    method: 'post',
                    url: 'https://tinypng.com/web/shrink',
                    headers: { 'User-Agent': `QQBrowser` },
                    data: requestData
                });
                return data;
            }
            catch (err) {
                if (err.response) {
                    const { data } = err.response;
                    throw new Error(JSON.stringify(data));
                }
                throw err;
            }
        });
    }
    static contentReader({ content, filename }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content) {
                return content;
            }
            if (!path.isAbsolute(filename)) {
                filename = path.resolve(process.cwd(), filename);
            }
            return yield fs.readFileAsync(filename);
        });
    }
    static validateUploadResponseData(data) {
        const { errors, valid } = revalidator_1.validate(data, tinypng_schema_1.uploadResponseSchema);
        if (!valid) {
            throw errors;
        }
    }
    download(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, status } = yield axios_1.default({
                url,
                responseType: 'arraybuffer'
            });
            if (status === 200) {
                return data;
            }
            else {
                throw new Error(data);
            }
        });
    }
}
exports.default = TinyPngIOImpl;
//# sourceMappingURL=impl.js.map