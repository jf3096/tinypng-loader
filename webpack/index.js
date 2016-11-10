"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Created by allen on 2016/11/9.
 */
const index_1 = require('../libs/index');
const path = require('path');
module.exports = function (contents) {
    return __awaiter(this, void 0, void 0, function* () {
        this.cacheable();
        const fileName = path.basename(this.resourcePath);
        const callback = this.async();
        const result = (yield index_1.default(contents, fileName)) || contents;
        callback(null, result);
    });
};
//# sourceMappingURL=index.js.map