/**
 * Created by allen on 2016/11/3.
 */
import * as request from 'request';
import * as http from 'http';
import {Transform} from 'stream';

export interface ITinyPng {
    upload(content: string): Promise<IUploadResponse>;
    download(url: string): Promise<Buffer>;
}

export interface IUploadResponse {
    input: {
        size: number;
        type: string;
    }
    output: {
        size: number;
        type: string;
        width: number;
        height: number;
        ratio: number;
        url: string;
    }
}

interface ITinyPngErrorResponse {
    error: string;
    message: string;
}

class TinyPng implements ITinyPng {
    public upload(contents: string): Promise<IUploadResponse> {
        const method = `post`;
        const shrinkUrl = `https://tinypng.com/site/shrink`;
        const headers = {
            'User-Agent': `QQBrowser`
        };
        const body = new Buffer(contents, 'base64');
        return new Promise((resolve, reject) => {
            request({url: shrinkUrl, method, headers, body}, (error: any, response: http.IncomingMessage, body: string) => {
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

                if ((result as ITinyPngErrorResponse).error) {
                    reject(result);
                    return;
                }
                resolve(JSON.parse(body));
            });
        });
    }

    public download(url: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const transform = new Transform();
            request({url, strictSSL: false})
                .on('data', function (chunk) {
                    transform.push(chunk)
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
export default tinyPng;