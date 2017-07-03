
const debug = require('debug')('quizar-data');
import { IRepository, IEntityMapper, convertMongoError, RepUpdateData, RepAccessOptions } from 'quizar-domain';
import { MongoModel, MongoParamsWhere, MongoParams, MongoUpdateData } from '../entities/model';
import { Bluebird } from '../utils';

export class Repository<DE extends { id?: string }, E extends { id?: string }, M extends MongoModel<E>, P extends IEntityMapper<DE, E>> implements IRepository<DE> {

    constructor(private model: M, private mapper: P) { }

    create(data: DE, options?: RepAccessOptions): Bluebird<DE> {
        const entity = this.mapper.fromDomainEntity(data);
        return this.model.create(entity)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }
    update<O>(data: RepUpdateData<DE>, options?: O): Bluebird<DE> {
        const entity = this.mapper.fromDomainEntity(data.item);
        const mdata: MongoUpdateData<E> = { id: entity.id, set: entity, unset: (data.delete || []).reduce((pv, cv) => { pv[cv.toString()] = ""; return pv; }, {}) };

        delete mdata.set.id;

        debug('updating model', JSON.stringify(mdata));
        return this.model.update(mdata)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }
    remove<O>(id: string, options?: O): Bluebird<boolean> {
        return this.model.remove(id)
            .then(e => !!e)
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }

    count(where: MongoParamsWhere): Bluebird<number> {
        return this.model.count(where);
    }

    list(params: MongoParams): Bluebird<DE[]> {
        return this.model.list(params)
            .then(items => items.map(item => this.mapper.toDomainEntity(item)))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }

    getById(id: string, options?: RepAccessOptions): Bluebird<DE> {
        return this.model.one({ where: { _id: id } })
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }

    exists(id: string): Bluebird<boolean> {
        return this.getById(id, { fields: 'id' }).then(item => !!item);
    }

    updateMongo(condition, doc, options?) {
        return this.model.updateMongo(condition, doc, options)
    }
}
