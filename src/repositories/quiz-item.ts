
import { QuizItem  as DomainQuizItem, IQuizItemRepository } from 'quizar-domain';
import { QuizItemModel, QuizItem } from '../entities/quiz-item';
import { Repository } from './repository';
import { QuizItemMapper } from '../entities/quiz-item-mapper';

export class QuizItemRepository extends Repository<DomainQuizItem, QuizItem, QuizItemModel, QuizItemMapper> implements IQuizItemRepository {

}
