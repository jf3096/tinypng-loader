/**
 * Created by allen on 2016/11/3.
 */
import {TextEncoder, TextDecoder} from 'text-encoding';

export function string2Uint8array(content: string): Uint8Array {
    if (content === null || content === undefined || content === ``) {
        return null;
    }
    if (typeof content != `string`) {
        throw new Error(`utils: unknown parameter type. expect parameter type to be string`);
    }
    return new TextEncoder().encode(content);
}

export function uint8array2String(uint8array: Uint8Array): string {
    return new TextDecoder().decode(uint8array);
}