
import { Quiz as DomainQuiz, IQuizRepository, QuizItemInfo as DomainQuizItemInfo, DataNotFoundError, EntityNameType } from 'quizar-domain';
import { QuizModel, Quiz } from '../entities/quiz';
import { Repository } from './repository';
import { QuizMapper } from '../entities/mappers';
import { Connection } from 'mongoose';
import { Bluebird, _ } from '../utils';

export class QuizRepository extends Repository<DomainQuiz, Quiz, QuizModel, QuizMapper> implements IQuizRepository {
    constructor(connection: Connection) {
        super(new QuizModel(connection), QuizMapper.instance);
    }

    protected getEntityName(): EntityNameType {
        return 'Quiz';
    }

    countByTopicId(topicId: string): Bluebird<number> {
        return this.count({ topics: topicId });
    }
}
