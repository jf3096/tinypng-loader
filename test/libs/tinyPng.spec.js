"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by allen on 2016/11/3.
 */
const fs = require("fs");
const path = require("path");
const tinyPng_1 = require("../../libs/tinyPng");
const tinypng_schema_1 = require("../schema/tinypng.schema");
const revalidator = require("revalidator");
describe('index', () => {
    describe('upload', () => {
        let imgContent = ``;
        before(function () {
            const targetPath = path.resolve(__dirname, '../img/sample2.png');
            const imgBuffer = fs.readFileSync(targetPath);
            imgContent = imgBuffer.toString('base64');
        });
        it('should upload successfully', (done) => {
            tinyPng_1.default.upload(imgContent).then((response) => {
                const result = revalidator.validate(response, tinypng_schema_1.uploadResponseSchema);
                result.valid ? done() : done(result.errors);
            }, (err) => {
                done(err);
            });
        });
    });
    describe('download', () => {
        let downloadUrl = `https://tinypng.com/site/output/aqtf55alr1ah49km.png`;
        it('should download successfully', (done) => {
            tinyPng_1.default.download(downloadUrl).then(() => {
                done();
            }, (err) => {
                done(err);
            });
        });
    });
});
//# sourceMappingURL=tinyPng.spec.js.map