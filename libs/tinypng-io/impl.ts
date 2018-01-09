import {ITinyPngIO, IUploadParams, IUploadResponse} from './interface';
import axios from 'axios';
import {validate} from "revalidator";
import * as path from 'path';
import * as fs from 'fs-extra-promise';
import {uploadResponseSchema} from '../schema/tinypng.schema';

export default class TinyPngIOImpl implements ITinyPngIO {

    public async upload({content, filename}: IUploadParams): Promise<IUploadResponse> {
        const requestData = await TinyPngIOImpl.contentReader({content, filename});
        const data = await TinyPngIOImpl.requestForShrink(requestData);
        TinyPngIOImpl.validateUploadResponseData(data);
        return data;
    }

    private static async requestForShrink(requestData) {
        try {
            const {data} = await axios({
                method: 'post',
                url: 'https://tinypng.com/web/shrink',
                headers: {'User-Agent': `QQBrowser`},
                data: requestData
            });
            return data;
        } catch (err) {
            if (err.response) {
                const {data} = err.response;
                throw new Error(JSON.stringify(data));
            }
            throw err;
        }
    }

    private static async contentReader({content, filename}: IUploadParams) {
        if (content) {
            return content;
        }
        if (!path.isAbsolute(filename)) {
            filename = path.resolve(process.cwd(), filename);
        }
        return await fs.readFileAsync(filename);
    }

    private static validateUploadResponseData(data) {
        const {errors, valid} = validate(data, uploadResponseSchema);
        if (!valid) {
            throw errors;
        }
    }

    public async download(url: string): Promise<Buffer> {
        const {data, status} = await axios({
            url,
            responseType: 'arraybuffer'
        });
        if (status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    }
}