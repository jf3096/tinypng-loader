import {tinypngErrorLogger, tinypngLogger} from './cli';
import tinyPng from './tinypng-io';
import * as path from 'path';
import File = require('vinyl');

const validExts = ['.jpg', '.jpeg', '.png'];

function processTinyPngErrorProxy(fileName: string) {
    return (proxyFunc) => {
        try {
            return proxyFunc();
        } catch (err) {
            tinypngErrorLogger({
                fileName,
                errorMessage: JSON.stringify(err)
            });
        }
    }
}

export default async function processTinyPng(content: Buffer, file: File): Promise<Buffer> {
    const fileName = file.relative;
    const ext = path.extname(file.path).toLowerCase();
    const proxy = processTinyPngErrorProxy(fileName);
    return await proxy(async () => {
        if (!~validExts.indexOf(ext)) {
            throw {message: `tinypng only support png or jp(e)g. unexpected format = ${ext}`};
        }
        const uploadResponse = await tinyPng.upload({content});
        const targetDownloadUrl = uploadResponse.output.url;
        const result = await tinyPng.download(targetDownloadUrl);
        tinypngLogger({
            fileName,
            beforeSize: uploadResponse.input.size,
            afterSize: uploadResponse.output.size
        });
        return result;
    });
}
