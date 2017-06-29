
import { IRepository, IEntityMapper, convertMongoError } from 'quizar-domain';
import { MongoModel, MongoParamsWhere, MongoParams } from '../entities/model';
import { Bluebird } from '../utils';

export class Repository<DE, E, M extends MongoModel<E>, P extends IEntityMapper<DE, E>> implements IRepository<DE> {

    constructor(private model: M, private mapper: P) { }

    create<O>(data: DE, options?: O): Bluebird<DE> {
        const entity = this.mapper.fromDomainEntity(data);
        return this.model.create(entity)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }
    update<O>(data: DE, options?: O): Bluebird<DE> {
        const entity = this.mapper.fromDomainEntity(data);
        return this.model.update(entity)
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

    getById<O>(id: string, options?: O): Bluebird<DE> {
        return this.model.one({ where: { _id: id } })
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => Bluebird.reject(convertMongoError(error)));
    }

    updateMongo(condition, doc, options?){
        return this.model.updateMongo(condition, doc, options)
    }
}
