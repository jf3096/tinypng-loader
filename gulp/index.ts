import * as through from 'through2';
import {PluginError} from 'gulp-util';
import processTinyPng from '../libs/index';
import {tinypngLogger} from '../libs/cli';
import TransformCallback = require('through2');
import FlushCallback = require('through2');
import File = require('vinyl');


type TransformCallback = (err?: any, data?: any) => void;


const PLUGIN_NAME = 'gulp-tinypng';

function bufferOnly(callback: Function) {

    let totalSize = 0;
    let optimizedSize = 0;

    function decorateTransformCallback(file: File, transformCallback: TransformCallback) {
        totalSize += file.stat.size;
        return () => {
            optimizedSize += (file.contents as Buffer).length;
            transformCallback(null, file);
        }
    }

    return () => through.obj((file, encoding, cb: TransformCallback) => {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'index.ts: tinypng does not support stream'));
            return callback(null, file);
        } else if (file.isBuffer()) {
            callback(file, encoding, decorateTransformCallback(file, cb));
        }
    }, () => {
        tinypngLogger({
            fileName: `SUMMARY`,
            beforeSize: totalSize,
            afterSize: optimizedSize
        });
    });
}

const gulpTinyPng = bufferOnly(async(file, encoding, cb) => {
    const contents = file.contents;
    const fileName = file.relative;
    file.contents = await processTinyPng(contents, fileName) || contents;
    cb();
});

export = gulpTinyPng;