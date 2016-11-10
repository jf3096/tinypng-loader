"use strict";
/**
 * Created by allen on 2016/11/3.
 */
const request = require('request');
const stream_1 = require('stream');
class TinyPng {
    upload(contents) {
        const method = `post`;
        const shrinkUrl = `https://tinypng.com/site/shrink`;
        const headers = {
            'User-Agent': `QQBrowser`
        };
        const body = new Buffer(contents, 'base64');
        return new Promise((resolve, reject) => {
            request({ url: shrinkUrl, method, headers, body }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!body) {
                    throw new Error(`index.ts: response data should not be empty: ${body}`);
                }
                const result = JSON.parse(body);
                if (typeof result !== `object`) {
                    throw new Error(`index.ts: unknown response data type: ${result}`);
                }
                if (!result) {
                    throw new Error(`index.ts: response data is empty: ${result}`);
                }
                if (result.error) {
                    reject(result);
                    return;
                }
                resolve(JSON.parse(body));
            });
        });
    }
    download(url) {
        return new Promise((resolve, reject) => {
            const transform = new stream_1.Transform();
            request({ url, strictSSL: false })
                .on('data', function (chunk) {
                transform.push(chunk);
            })
                .on('end', function () {
                const buffer = transform.read();
                resolve(buffer);
            })
                .on('error', (error) => {
                reject(error);
            });
        });
    }
}
const tinyPng = new TinyPng();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tinyPng;
//# sourceMappingURL=tinyPng.js.map