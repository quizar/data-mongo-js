
import { IRepository, IEntityMapper, convertMongoError } from 'quizar-domain';
import { MongoModel } from '../entities/model';
import { Bluebird } from '../utils';

export class Repository<DE, E, M extends MongoModel<E>, P extends IEntityMapper<DE, E>> implements IRepository<DE> {
    model: M;
    mapper: P;

    constructor(model: M, mapper: P) {
        this.model = model;
        this.mapper = mapper;
    }

    create(data: DE): Promise<DE> {
        const entity = this.mapper.fromDomainEntity(data);
        return this.model.create(entity)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => convertMongoError(error));
    }
    update(data: DE): Promise<DE> {
        const entity = this.mapper.fromDomainEntity(data);
        return this.model.update(entity)
            .then(d => this.mapper.toDomainEntity(d))
            .catch(error => convertMongoError(error));
    }
    remove(id: string): Promise<boolean> {
        return this.model.remove(id)
            .then(e => !!e)
            .catch(error => convertMongoError(error));
    }
}
