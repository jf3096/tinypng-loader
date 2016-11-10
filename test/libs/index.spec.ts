/**
 * Created by allen on 2016/11/3.
 */
import * as fs from 'fs';
import * as path from 'path';
import {IUploadResponse, default as tinyPng} from '../../libs/tinyPng';
import {uploadResponseSchema} from '../schema/tinypng.schema';
import * as revalidator from 'revalidator';

describe('index', () => {
    describe('upload', () => {
        let imgContent = ``;

        before(function () {
            const targetPath = path.resolve(__dirname, '../img/sample2.png');
            const imgBuffer = fs.readFileSync(targetPath);
            imgContent = imgBuffer.toString('base64');
        });

        it('should upload successfully', (done) => {
            tinyPng.upload(imgContent).then((response: IUploadResponse) => {
                const result = revalidator.validate(response, uploadResponseSchema);
                result.valid ? done() : done(result.errors);
            }, (err) => {
                done(err);
            })
        });
    });

    describe('download', () => {
        let downloadUrl = `https://tinypng.com/site/output/aqtf55alr1ah49km.png`;
        it('should download successfully', (done) => {
            tinyPng.download(downloadUrl).then(() => {
                done();
            }, (err) => {
                done(err);
            })
        });
    })
});