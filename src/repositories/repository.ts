
const debug = require('debug')('quizar-data');
import { Repository as IRepository, IEntityMapper, convertMongoError, RepUpdateData, RepAccessOptions, RepUpdateOptions, EntityNameType, CodeError, RepGetData, RepListData, IdUniqueKey, DataKeys } from 'quizar-domain';
import { MongoModel, MongoParamsWhere, MongoParams, MongoUpdateData } from '../entities/model';
import { Bluebird } from '../utils';
import { getMapper } from '../entities/mappers';

export abstract class Repository<DE extends { id?: string }, E extends { id?: string }, M extends MongoModel<E>, P extends IEntityMapper<DE, E>> implements IRepository<DE> {
    constructor(private entityName: EntityNameType, private model: M, private mapper: P) { }

    create(data: DE, options?: RepAccessOptions): Bluebird<DE> {
        const entity = this.mapper.fromDomainEntity(data);
        return this.model.create(entity)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }
    update(data: RepUpdateData<DE>, options?: RepUpdateOptions): Bluebird<DE> {
        const entity = this.mapper.fromDomainEntity(data.item);
        const mdata: MongoUpdateData<E> = { id: entity.id, set: entity, unset: (data.delete || []).reduce((pv, cv) => { pv[cv.toString()] = ""; return pv; }, {}) };

        delete mdata.set.id;

        debug('updating model', JSON.stringify(mdata));
        return this.model.update(mdata)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }
    delete(id: string): Bluebird<boolean> {
        return this.model.remove(id)
            .then(e => !!e)
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }

    count(data?: RepGetData): Bluebird<number> {
        const where = toMongoWhere(this.entityName, data);

        return this.model.count(where);
    }

    one(data: RepGetData, options?: RepAccessOptions): Bluebird<DE> {

        return Bluebird.try(() => toMongoParams(this.entityName, { keys: data, count: 1 }, options && options.fields))
            .then(params => this.model.one(params)
                .then(d => this.mapper.toDomainEntity(d))
                .catch(error => Bluebird.reject(convertMongoError(error)))
            );
    }

    list(data: RepListData, options?: RepAccessOptions): Bluebird<DE[]> {
        return Bluebird.try(() => toMongoParams(this.entityName, data, options && options.fields))
            .then(params => this.model.list(params)
                .then(items => items.map(item => this.mapper.toDomainEntity(item)))
                .catch(error => Bluebird.reject(convertMongoError(error)))
            );
    }

    getById(id: string, options?: RepAccessOptions): Bluebird<DE> {
        return this.one(IdUniqueKey.create(id), options);
    }
}

function getField(modelName: EntityNameType, name: string): string {
    const mapper = getMapper(modelName);
    const field = mapper.fromDomainEntityField(name);
    if (!field) {
        throw new CodeError({ message: `Unknown field ${name} for entity ${modelName}` });
    }
    return field === 'id' ? '_id' : field;
}

function toMongoSelect(name: EntityNameType, fields: string[]): string {
    if (fields) {
        const output = fields.map(item => getField(name, item));
        return output.join(' ');
    }
}

function toMongoSort(name: EntityNameType, keys: DataKeys): string {
    if (keys.sortKeys && keys.sortKeys.length) {
        const output = keys.sortKeys.map(item => item.direction === 'DESC' ? '-' : '' + getField(name, item.name));
        return output.join(' ');
    }
}

const WHERE_PARAMS_MAP = {
    WikiEntity: { id: '_id' },
    QuizItem: { id: '_id', topicId: 'topicsIds', entityId: 'entityId' },
    Quiz: { id: '_id', topicId: 'topicsIds' }
}

function toMongoWhere(name: EntityNameType, keys: DataKeys): MongoParamsWhere {
    return keys.indexKeys.reduce((where, item) => {
        const field = WHERE_PARAMS_MAP[name][item.name];
        if (!field) {
            throw new CodeError({ message: `Unknown field ${item.name} for entity ${name}` });
        }
        where[field] = item.value;
        return where;
    }, {});
}

function toMongoParams(name: EntityNameType, data: RepListData, fields?: string[]): MongoParams {
    const mongoWhere = toMongoWhere(name, data.keys);
    const mongoSelect = toMongoSelect(name, fields);
    const mongoSort = toMongoSort(name, data.keys);

    return { where: mongoWhere, select: mongoSelect, sort: mongoSort, limit: data.count };
}
