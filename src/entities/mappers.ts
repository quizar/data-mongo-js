
import { EntityMapper, QuizItem as DomainQuizItem, Quiz as DomainQuiz, WikiEntity as DomainWikiEntity } from 'quizar-domain';
import { QuizItem } from './quiz-item';
import { Quiz } from './quiz';
import { WikiEntity } from './wiki-entity';
import { MapperContainer } from './mapper-container';

export class QuizItemMapper extends EntityMapper<DomainQuizItem, QuizItem> {
    constructor() {
        const info = MapperContainer.getMapInfo('QuizInfo');
        super(info.fromDomainEntity, info.toDomainEntity);
    }
}

export class QuizMapper extends EntityMapper<DomainQuiz, Quiz> {
    constructor() {
        const info = MapperContainer.getMapInfo('Quiz');
        super(info.fromDomainEntity, info.toDomainEntity);
    }
}

export class WikiEntityMapper extends EntityMapper<DomainWikiEntity, WikiEntity> {
    constructor() {
        const info = MapperContainer.getMapInfo('WikiEntity');
        super(info.fromDomainEntity, info.toDomainEntity);
    }
}
