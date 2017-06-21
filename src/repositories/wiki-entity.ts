
import { WikiEntity as DomainWikiEntity, IWikiEntityRepository } from 'quizar-domain';
import { WikiEntityModel, WikiEntity } from '../entities/wiki-entity';
import { Repository } from './repository';
import { WikiEntityMapper } from '../entities/mappers';
import { Connection } from 'mongoose';

export class WikiEntityRepository extends Repository<DomainWikiEntity, WikiEntity, WikiEntityModel, WikiEntityMapper> implements IWikiEntityRepository {
    constructor(connection: Connection) {
        super(new WikiEntityModel(connection), WikiEntityMapper.instance);
    }
}
