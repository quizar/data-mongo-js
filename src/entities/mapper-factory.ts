
import { IMapper } from './mapper';
import { QuizMapper } from './quiz-mapper';
import { QuizItemMapper } from './quiz-item-mapper';
import { WikiEntityMapper } from './wiki-entity-mapper';

const mappers = {};

export function getQuizMapper(): QuizMapper {
    if (!mappers['Quiz']) {
        mappers['Quiz'] = new QuizMapper();
    }

    return mappers['Quiz'];
}

export function getQuizItemMapper(): QuizItemMapper {
    if (!mappers['QuizItem']) {
        mappers['QuizItem'] = new QuizItemMapper();
    }

    return mappers['QuizItem'];
}

export function getWikiEntityMapper(): WikiEntityMapper {
    if (!mappers['WikiEntity']) {
        mappers['WikiEntity'] = new WikiEntityMapper();
    }

    return mappers['WikiEntity'];
}
