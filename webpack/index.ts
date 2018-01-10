/**
 * Created by allen on 2016/11/9.
 */
import processTinyPng from '../libs/index';
import {getOptions} from 'loader-utils';
import * as validateOptions from 'schema-utils';
import Vinyl = require('vinyl');

const schema = {
    type: 'object',
    properties: {
        test: {
            instanceof: "RegExp"
        }
    }
};

module.exports = function (contents: any, map, meta) {
    this.cacheable();
    const options = getOptions(this) || {};
    validateOptions(schema, options, 'tinypng loader');
    const regex = options.test;
    const {resourcePath} = this;
    if (regex && !regex.test(resourcePath)) {
        return contents;
    }
    const callback = this.async();
    processTinyPng(contents, new Vinyl({path: this.resourcePath})).then((result) => {
        // noinspection JSIgnoredPromiseFromCall
        callback(null, result || contents, map, meta);
    }).catch((err) => {
        // noinspection JSIgnoredPromiseFromCall
        callback(err);
    });
};

module.exports.raw = true;