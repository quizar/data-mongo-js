
import { Quiz  as DomainQuiz, IQuizRepository } from 'quizar-domain';
import { QuizModel, Quiz } from '../entities/quiz';
import { Repository } from './repository';
import { QuizMapper } from '../entities/quiz-mapper';

export class QuizRepository extends Repository<DomainQuiz, Quiz, QuizModel, QuizMapper> implements IQuizRepository {

}