/**
 * Created by allen on 2016/11/9.
 */
import processTinyPng from '../libs/index';
import * as path from 'path';

module.exports = async function (contents) {
    this.cacheable();
    const fileName = path.basename(this.resourcePath);
    const callback = this.async();
    const result = await processTinyPng(contents, fileName) || contents;
    callback(null, result);
};