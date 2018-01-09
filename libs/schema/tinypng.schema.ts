import JSONSchema = Revalidator.JSONSchema;
import {IUploadResponse} from '../tinypng-io/interface';

export const uploadResponseSchema: JSONSchema<IUploadResponse> = {
    properties: {
        input: {
            type: 'object',
            required: true,
            properties: {
                size: {
                    type: 'integer',
                    required: true
                },
                type: {
                    type: 'string',
                    pattern: '^image\/(png|jpe?g)$',
                    required: true
                },
            }
        },
        output: {
            type: 'object',
            required: true,
            properties: {
                size: {
                    type: 'integer',
                    required: true
                },
                type: {
                    type: 'string',
                    pattern: '^image\/(png|jpe?g)$',
                    required: true
                },
                width: {
                    type: 'number',
                    required: true
                },
                height: {
                    type: 'number',
                    required: true
                },
                ratio: {
                    type: 'number',
                    required: true
                },
                url: {
                    type: 'string',
                    required: true
                }
            }
        }
    }
};
