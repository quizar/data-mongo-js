
import { mongoGet as get, _, Bluebird, IPlainObject, PlainObject } from '../utils'
import { BaseEntity } from './entity'
import { Model, Schema } from 'mongoose'

export class MongoModel<T extends BaseEntity> {

    constructor(private model: Model<any>) {

    }

    create(data: T): Bluebird<T> {
        if (!data) {
            return Bluebird.reject(Error('`data` is required'));
        }
        try {
            data = this.normalizeCreate(data);
        } catch (e) {
            return Bluebird.reject(e);
        }
        return new Bluebird<T>((resolve, reject) => {
            this.model.create(data).then(get, reject).then(resolve);
        });
    }

    normalizeCreate(data) {
        data._id = data._id || data.id;
        return data;
    }

    normalizeUpdate(data) {
        // data._id = data._id || data.id;
        return data;
    }

    update(data: MongoUpdateData<T>): Bluebird<T> {
        if (!data) {
            return Bluebird.reject(Error('`data` is required'));
        }
        try {
            data = this.normalizeUpdate(data);
        } catch (e) {
            return Bluebird.reject(e);
        }
        return new Bluebird<T>((resolve, reject) => {
            this.model.findByIdAndUpdate(data.id, { $set: data.set, $unset: data.unset }).then(get, reject).then(resolve);
        });
    }

    updateMongo(condition, data, options?) {
        return new Bluebird<T>((resolve, reject) => {
            this.model.update(condition, data, options).then(get, reject).then(resolve);
        });
    }

    remove(params: MongoParams): Bluebird<T> {
        if (!params) {
            Bluebird.reject(Error('`params` is required'));
        }

        return new Bluebird<T>((resolve, reject) => {
            this.model.remove(params.where).then(get, reject).then(resolve);
        });
    }

    one(params: MongoParams): Bluebird<T> {
        if (!params) {
            Bluebird.reject(Error('`params` is required'));
        }
        return new Bluebird<T>((resolve, reject) => {
            this.model.findOne(params.where, params.select).then(get, reject).then(resolve);
        });
    }

    count(where: MongoParamsWhere): Bluebird<number> {
        return new Bluebird<number>((resolve, reject) => {
            this.model.count(where).then(resolve, reject);
        });
    }

    list(params: MongoParams): Bluebird<T[]> {
        if (!params) {
            Bluebird.reject(Error('`params` is required'));
        }

        return new Bluebird<T[]>((resolve, reject) => {
            this.model
                .find(params.where)
                .select(params.select)
                .sort(params.sort)
                .skip(params.offset || 0)
                .limit(params.limit || 10)
                .exec()
                .then(get, reject)
                .then(resolve);
        });
    }
}

export type MongoParamsWhere = PlainObject
export type MongoParams = {
    where?: MongoParamsWhere
    select?: string
    offset?: number
    limit?: number
    sort?: string
}

export type MongoUpdateData<T> = {
    id: string
    set?: T
    unset?: { [index: string]: string }
}
