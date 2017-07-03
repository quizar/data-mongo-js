
import { QuizItem as DomainQuizItem, IQuizItemRepository, EntityNameType } from 'quizar-domain';
import { QuizItemModel, QuizItem } from '../entities/quiz-item';
import { Repository } from './repository';
import { QuizItemMapper } from '../entities/mappers';
import { Connection } from 'mongoose';
import { Bluebird } from '../utils';

export class QuizItemRepository extends Repository<DomainQuizItem, QuizItem, QuizItemModel, QuizItemMapper> implements IQuizItemRepository {
    constructor(connection: Connection) {
        super(new QuizItemModel(connection), QuizItemMapper.instance);
    }

    protected getEntityName(): EntityNameType {
        return 'QuizItem';
    }

    countByTopicId(topicId: string): Bluebird<number> {
        return this.count({ topics: topicId });
    }
}
