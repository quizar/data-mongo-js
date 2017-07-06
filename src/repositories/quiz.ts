
import { Quiz as DomainQuiz, QuizRepository as IQuizRepository, QuizItemInfo as DomainQuizItemInfo, DataNotFoundError, EntityNameType, ENTITY_NAMES, TopicIdIndexKey } from 'quizar-domain';
import { QuizModel, Quiz } from '../entities/quiz';
import { Repository } from './repository';
import { QuizMapper } from '../entities/mappers';
import { Connection } from 'mongoose';
import { Bluebird, _ } from '../utils';

export class QuizRepository extends Repository<DomainQuiz, Quiz, QuizModel, QuizMapper> implements IQuizRepository {
    constructor(connection: Connection) {
        super(ENTITY_NAMES.Quiz, new QuizModel(connection), QuizMapper.instance);
    }

    countByTopicId(topicId: string): Bluebird<number> {
        return this.count(TopicIdIndexKey.create(topicId));
    }
}
