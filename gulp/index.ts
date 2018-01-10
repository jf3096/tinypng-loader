import * as through from 'through2-concurrent';
import {PluginError} from 'gulp-util';
import {tinypngErrorLogger, tinypngLogger} from '../libs/cli';
import processTinyPng from '../libs';
import TransformCallback = require('through2');
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

    return ({maxConcurrency = 10} = {}) => through.obj({maxConcurrency}, (file, encoding, cb: TransformCallback) => {

        if (maxConcurrency > 20) {
            console.warn(`tinypng.com has upload limit in the same period of time. so please keep the maxConcurrency under 20.`);
        }

        if (file.isNull()) {
            cb();
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'index.ts: tinypng does not support stream'));
            return callback(null, file);
        } else if (file.isBuffer()) {
            callback(file, encoding, decorateTransformCallback(file, cb));
        }
    }, (callback) => {
        tinypngLogger({
            fileName: `SUMMARY`,
            beforeSize: totalSize,
            afterSize: optimizedSize
        });
        callback();
    });
}

const gulpTinyPng = bufferOnly(async (file, encoding, cb) => {
    const contents = file.contents;
    const fileName = file.relative;
    try {
        file.contents = await processTinyPng(contents, file);
    } catch (e) {
        tinypngErrorLogger({
            fileName: fileName,
            errorMessage: e.message,
        });
    }
    cb();
});

export = gulpTinyPng;