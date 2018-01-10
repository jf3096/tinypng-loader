"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by allen on 2016/11/9.
 */
const index_1 = require("../libs/index");
const loader_utils_1 = require("loader-utils");
const validateOptions = require("schema-utils");
const Vinyl = require("vinyl");
const schema = {
    type: 'object',
    properties: {
        test: {
            instanceof: "RegExp"
        }
    }
};
module.exports = function (contents, map, meta) {
    this.cacheable();
    const options = loader_utils_1.getOptions(this) || {};
    validateOptions(schema, options, 'tinypng loader');
    const regex = options.test;
    const { resourcePath } = this;
    if (regex && !regex.test(resourcePath)) {
        return contents;
    }
    const callback = this.async();
    index_1.default(contents, new Vinyl({ path: this.resourcePath })).then((result) => {
        // noinspection JSIgnoredPromiseFromCall
        callback(null, result || contents, map, meta);
    }).catch((err) => {
        // noinspection JSIgnoredPromiseFromCall
        callback(err);
    });
};
module.exports.raw = true;
//# sourceMappingURL=index.js.map