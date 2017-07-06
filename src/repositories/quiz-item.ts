
import { QuizItem as DomainQuizItem, QuizItemRepository as IQuizItemRepository, EntityNameType, ENTITY_NAMES, TopicIdIndexKey } from 'quizar-domain';
import { QuizItemModel, QuizItem } from '../entities/quiz-item';
import { Repository } from './repository';
import { QuizItemMapper } from '../entities/mappers';
import { Connection } from 'mongoose';
import { Bluebird } from '../utils';

export class QuizItemRepository extends Repository<DomainQuizItem, QuizItem, QuizItemModel, QuizItemMapper> implements IQuizItemRepository {
    constructor(connection: Connection) {
        super(ENTITY_NAMES.QuizItem, new QuizItemModel(connection), QuizItemMapper.instance);
    }

    countByTopicId(topicId: string): Bluebird<number> {
        return this.count(TopicIdIndexKey.create(topicId));
    }
}
