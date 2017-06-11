
import { mongoGet as get, _, Bluebird, IPlainObject, PlainObject } from '../utils'
import { BaseEntity } from './entity'
import { Model, Schema } from 'mongoose'

export class MongoModel<T extends BaseEntity> {
    private model: Model<any>

    constructor(model: Model<any>) {
        this.model = model;
    }

    create(data: T): Promise<T> {
        if (!data) {
            return Bluebird.reject(Error('`data` is required'));
        }
        try {
            data = this.normalizeCreate(data);
        } catch (e) {
            return Bluebird.reject(e);
        }
        return this.model.create(data).then(get);
    }

    normalizeCreate(data) {
        return data;
    }

    normalizeUpdate(data) {
        return data;
    }

    update(data: T): Promise<T> {

        if (!data) {
            return Bluebird.reject(Error('`data` is required'));
        }
        try {
            data = this.normalizeUpdate(data);
        } catch (e) {
            return Bluebird.reject(e);
        }
        return this.model.findByIdAndUpdate(data.id, data).then(get)
    }

    remove(params: MongoParams): Promise<T> {
        if (!params) {
            Bluebird.reject(Error('`params` is required'));
        }

        return this.model.remove(params.where).then(get);
    }

    one(params: MongoParams): Promise<T> {
        if (!params) {
            Bluebird.reject(Error('`params` is required'));
        }

        return this.model.findOne(params.where, params.select).then(get);
    }

    count(where: MongoParamsWhere): Promise<number> {
        return this.model.count(where);
    }

    list(params: MongoParams): Promise<T[]> {
        if (!params) {
            Bluebird.reject(Error('`params` is required'));
        }

        return this.model
            .find(params.where)
            .select(params.select)
            .sort(params.sort)
            .skip(params.offset || 0)
            .limit(params.limit || 10)
            .exec()
            .then(get);
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
