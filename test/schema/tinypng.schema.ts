import JSONSchema = Revalidator.JSONSchema;
import {IUploadResponse} from '../../libs/tinyPng';

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
                    pattern: '^image/png$',
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
                    pattern: '^image/png$',
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
}
