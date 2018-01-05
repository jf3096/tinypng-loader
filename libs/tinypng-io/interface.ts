export interface ITinyPngIO {
    upload(params: IUploadParams): Promise<IUploadResponse>;

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

export type IUploadParams = IUploadParamsWidthContentOnly | IUploadParamsWidthFilenameOnly;

export interface IUploadParamsWidthContentOnly {
    content: Buffer;
    filename?: string;
}

export interface IUploadParamsWidthFilenameOnly {
    content?: Buffer;
    filename: string;
}

interface ITinyPngErrorResponse {
    error: string;
    message: string;
}