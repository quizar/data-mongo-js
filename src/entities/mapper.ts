
export interface IMapper<E, T> {
    fromDataEntity(data: E): T
    toDataEntity(data: T): E
}

export abstract class Mapper<E, T> implements IMapper<E, T> {

    fromDataEntity(data: E): T {
        if (~[null, undefined].indexOf(data)) {
            return null;
        }

        const entity = this.fromDataEntityImp(data);

        return Mapper.cleanObject(entity);
    }
    toDataEntity(data: T): E {
        if (~[null, undefined].indexOf(data)) {
            return null;
        }

        const entity = this.toDataEntityImp(data);

        return Mapper.cleanObject(entity);
    }

    abstract fromDataEntityImp(data: E): T
    abstract toDataEntityImp(data: T): E

    static cleanObject<T>(obj: T): T {
        for (var prop in obj) {
            if (~[null, undefined].indexOf(obj[prop])) {
                delete obj[prop];
            }
        }

        return obj;
    }
}
