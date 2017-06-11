
import { WikiEntity } from './wiki-entity';
import { Mapper } from './mapper';
import { WikiEntity as DomainWikiEntity, PropertyValueType } from 'quizar-domain';

export class WikiEntityMapper extends Mapper<WikiEntity, DomainWikiEntity> {

    fromDataEntityImp(data: WikiEntity): DomainWikiEntity {
        const entity: DomainWikiEntity = {
            id: data.id,
            lang: data.lang,
            label: data.label,
            description: data.description,
            aliases: data.aliases,
            props: data.props,
            types: data.types,
            pageTitle: data.pageTitle,
            extract: data.extract,
            categories: data.categories
        };

        return entity;
    }

    toDataEntityImp(data: DomainWikiEntity): WikiEntity {
        const entity: WikiEntity = {
            id: data.id,
            lang: data.lang,
            label: data.label,
            description: data.description,
            aliases: data.aliases,
            props: data.props,
            types: data.types,
            pageTitle: data.pageTitle,
            extract: data.extract,
            categories: data.categories
        };

        return entity;
    }

}