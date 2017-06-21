
import { EntityMapper, QuizItem as DomainQuizItem, Quiz as DomainQuiz, WikiEntity as DomainWikiEntity } from 'quizar-domain';
import { QuizItem } from './quiz-item';
import { Quiz } from './quiz';
import { WikiEntity } from './wiki-entity';
import { MapperContainer } from './mapper-container';

let quizItemMapper: QuizItemMapper;
let quizMapper: QuizMapper;
let wikiEntityMapper: WikiEntityMapper;

export class QuizItemMapper extends EntityMapper<DomainQuizItem, QuizItem> {
    constructor() {
        const info = MapperContainer.getMapInfo('QuizItem');
        super(info.fromDomainEntity, info.toDomainEntity);
    }

    static get instance() {
        if (!quizItemMapper) {
            quizItemMapper = new QuizItemMapper();
        }
        return quizItemMapper;
    }
}

export class QuizMapper extends EntityMapper<DomainQuiz, Quiz> {
    constructor() {
        const info = MapperContainer.getMapInfo('Quiz');
        super(info.fromDomainEntity, info.toDomainEntity);
    }

    static get instance() {
        if (!quizMapper) {
            quizMapper = new QuizMapper();
        }
        return quizMapper;
    }
}

export class WikiEntityMapper extends EntityMapper<DomainWikiEntity, WikiEntity> {
    constructor() {
        const info = MapperContainer.getMapInfo('WikiEntity');
        super(info.fromDomainEntity, info.toDomainEntity);
    }

    static get instance() {
        if (!wikiEntityMapper) {
            wikiEntityMapper = new WikiEntityMapper();
        }
        return wikiEntityMapper;
    }
}
