"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResponseSchema = {
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
//# sourceMappingURL=tinypng.schema.js.map