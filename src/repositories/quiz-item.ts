
import { QuizItem as DomainQuizItem, IQuizItemRepository } from 'quizar-domain';
import { QuizItemModel, QuizItem } from '../entities/quiz-item';
import { Repository } from './repository';
import { QuizItemMapper } from '../entities/mappers';
import { Connection } from 'mongoose';

export class QuizItemRepository extends Repository<DomainQuizItem, QuizItem, QuizItemModel, QuizItemMapper> implements IQuizItemRepository {

    constructor(connection: Connection) {
        super(new QuizItemModel(connection), QuizItemMapper.instance);
    }

    countByTopicId(topicId: string): Promise<number> {
        return this.count({ topics: topicId });
    }
}
