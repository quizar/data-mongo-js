
import { Quiz } from './quiz';
import { Mapper } from './mapper';
import { Quiz as DomainQuiz, QuizTarget, QuizItemInfo as DomainQuizItemInfo } from 'quizar-domain';

export type QuizItemInfo = {
    itemId?: string
    order?: number
    imageData?: string
    imageType?: string
    title?: string
    question?: string
    description?: string
    target?: string
}

export type Quiz = {
    id?: string
    target?: string
    lang?: string
    title?: string
    question?: string
    description?: string
    items?: QuizItemInfo[]
    imageData?: string
    imageType?: string
    createdAt?: number
    updatedAt?: number
}

export class QuizMapper extends Mapper<Quiz, DomainQuiz> {

    fromDataEntityImp(data: Quiz): DomainQuiz {
        const entity: DomainQuiz = {
            id: data.id,
            target: <QuizTarget>data.target,
            lang: data.lang,
            title: data.title,
            question: data.question,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };

        if (data.imageData) {
            entity.image = { data: data.imageData, propertyId: data.imageType };
        }

        if (data.items) {
            entity.items = data.items.map(it => {
                const el: DomainQuizItemInfo = { itemId: it.itemId, order: it.order, title: it.title, question: it.question, description: it.description, target: <QuizTarget>it.target };
                if (it.imageData) {
                    el.image = { data: it.imageData, propertyId: it.imageType };
                }
                return Mapper.cleanObject(el);
            });
        }

        return entity;
    }

    toDataEntityImp(data: DomainQuiz): Quiz {
        const entity: Quiz = {
            id: data.id,
            target: data.target,
            lang: data.lang,
            title: data.title,
            question: data.question,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };

        if (data.image) {
            entity.imageData = data.image.data;
            entity.imageType = data.image.propertyId;
        }

        if (data.items) {
            entity.items = data.items.map(it => {
                const el: QuizItemInfo = { itemId: it.itemId, order: it.order, title: it.title, question: it.question, description: it.description, target: <QuizTarget>it.target };
                if (it.image) {
                    el.imageData = it.image.data;
                    el.imageType = it.image.propertyId;
                }
                return Mapper.cleanObject(el);
            });
        }

        return entity;
    }

}