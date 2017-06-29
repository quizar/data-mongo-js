
export const TABLES_PREFIX = process.env.MONGO_TABLES_PREFIX || 'v0';

import { Bluebird } from 'quizar-domain';

import * as _ from 'lodash'
import { createHash } from 'crypto'

export { _, Bluebird }

export function sha1(value) {
    return createHash('sha1').update(value, 'utf8').digest('hex').toLowerCase();
}

export function md5(value) {
    return createHash('md5').update(value, 'utf8').digest('hex').toLowerCase();
}

export function isLetter(target) {
    return target.toUpperCase() !== target.toLowerCase();
}

export function isDigit(target) {
    return /^\d+$/.test(target);
}

function mongoGetItem(data, nofields) {

    function mapItem(item) {
        return mongoGetItem(item, nofields);
    }

    const _id = data._id;

    data = typeof data.toObject === 'function' ? data.toObject() : data;
    for (let prop in data) {
        if (prop === 'id' && _.isNumber(_id)) {
            data[prop] = parseInt(data[prop]);
        } else if (data[prop] === null || nofields.indexOf(prop) > -1) {
            delete data[prop];
        } else if (Array.isArray(data[prop])) {
            data[prop] = data[prop].map(mapItem);
        }
    }
    return data;
}

export function mongoGet(data, nofields?) {
    nofields = nofields || ['_id', '__v'];
    if (!Array.isArray(nofields)) {
        nofields = [nofields];
    }

    if (data && data.toObject) {
        return mongoGetItem(data, nofields);
    }
    if (data && Array.isArray(data)) {
        return data.map(function (item) {
            return mongoGetItem(item, nofields);
        });
    }
    return data;
}

export function getRandomInt(min, max) {
    min = min || 1;
    max = max || 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type IPlainObject<T> = {
    [index: string]: T
}

export type PlainObject = IPlainObject<any>
