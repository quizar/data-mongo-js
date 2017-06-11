
import { IRepository } from 'quizar-domain';
import { MongoModel } from '../entities/model';
import { IMapper } from '../entities/mapper';

export class Repository<T, E, M extends MongoModel<E>, P extends IMapper<E, T>> implements IRepository<T> {
    model: M;
    mapper: P;

    constructor(model: M, mapper: P) {
        this.model = model;
        this.mapper = mapper;
    }

    create(data: T): Promise<T> {
        const entity = this.mapper.toDataEntity(data);
        return this.model.create(entity).then(d => this.mapper.fromDataEntity(d));
    }
    update(data: T): Promise<T> {
        const entity = this.mapper.toDataEntity(data);
        return this.model.update(entity).then(d => this.mapper.fromDataEntity(d));
    }
    remove(id: string): Promise<boolean> {
        return this.model.remove(id).then(e => !!e);
    }

}