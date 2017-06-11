
import { QuizItem, IQuizItemRepository } from 'quizar-domain';
import { QuizItemModel, QuizItemEntity } from '../entities/quiz-item';
import { Repository } from './repository';
import { QuizItemMapper } from '../entities/quiz-item-mapper';

export class QuizItemRepository extends Repository<QuizItem, QuizItemEntity, QuizItemModel, QuizItemMapper> implements IQuizItemRepository {

}
