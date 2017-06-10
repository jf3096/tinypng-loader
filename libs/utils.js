"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by allen on 2016/11/3.
 */
const text_encoding_1 = require("text-encoding");
function string2Uint8array(content) {
    if (content === null || content === undefined || content === ``) {
        return null;
    }
    if (typeof content != `string`) {
        throw new Error(`utils: unknown parameter type. expect parameter type to be string`);
    }
    return new text_encoding_1.TextEncoder().encode(content);
}
exports.string2Uint8array = string2Uint8array;
function uint8array2String(uint8array) {
    return new text_encoding_1.TextDecoder().decode(uint8array);
}
exports.uint8array2String = uint8array2String;
//# sourceMappingURL=utils.js.map