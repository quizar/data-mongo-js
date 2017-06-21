
import { Quiz as DomainQuiz, IQuizRepository } from 'quizar-domain';
import { QuizModel, Quiz } from '../entities/quiz';
import { Repository } from './repository';
import { QuizMapper } from '../entities/mappers';
import { Connection } from 'mongoose';

export class QuizRepository extends Repository<DomainQuiz, Quiz, QuizModel, QuizMapper> implements IQuizRepository {

    constructor(connection: Connection) {
        super(new QuizModel(connection), QuizMapper.instance);
    }

    countByTopicId(topicId: string): Promise<number> {
        return this.count({ topics: topicId });
    }
}
