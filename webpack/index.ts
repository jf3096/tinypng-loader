/**
 * Created by allen on 2016/11/9.
 */
import processTinyPng from '../libs/index';
import * as fs from 'fs';
import Vinyl = require('vinyl');

module.exports.raw = true;

module.exports = async function (contents: any) {
    this.cacheable();
    return await processTinyPng(fs.readFileSync(this.resourcePath), new Vinyl({path: this.resourcePath})) || contents;
};
