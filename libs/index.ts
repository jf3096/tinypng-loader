import tinyPng from './tinyPng';
import {tinypngLogger, tinypngErrorLogger} from './cli';
/**
 * Created by allen on 2016/11/9.
 */


export default async function processTinyPng(contents: string, fileName: string): Promise<Buffer> {
    let result;
    try {
        const uploadResponse = await tinyPng.upload(contents);
        const targetDownloadUrl = uploadResponse.output.url;
        result = await tinyPng.download(targetDownloadUrl);
        tinypngLogger({
            fileName,
            beforeSize: uploadResponse.input.size,
            afterSize: uploadResponse.output.size
        });
    } catch (err) {
        tinypngErrorLogger({
            fileName,
            errorMessage: JSON.stringify(err)
        });
    }
    return result;
}