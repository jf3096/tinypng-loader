/**
 * Created by allen on 2016/11/9.
 */
import processTinyPng from '../libs/index';
import * as path from 'path';

module.exports.raw = true;

module.exports = async function (contents: string) {
    this.cacheable();
    const fileName = path.basename(this.resourcePath);
    const result = await processTinyPng(contents, fileName) || contents;
    this.async()(null, result);
};
