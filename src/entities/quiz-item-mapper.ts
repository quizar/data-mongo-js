
import { QuizItemEntity } from './quiz-item';
import { Mapper } from './mapper';
import { QuizItem } from 'quizar-domain';

export class QuizItemMapper extends Mapper<QuizItemEntity, QuizItem> {

    fromDataEntityImp(data: QuizItemEntity): QuizItem {
        throw new Error("Method not implemented.");
    }

    toDataEntityImp(data: QuizItem): QuizItemEntity {
        const entity: QuizItemEntity = {
            entityId: data.entity.id,
            propertyId: data.propertyId,
            value: data.value.value,
            valueType: data.value.type,
            target: data.target,
            title: data.title,
            question: data.question,
            description: data.description
        };

        if (data.image) {
            entity.imageData = data.image.data;
            entity.imageTypeId = data.image.propertyId;
        }

        if (data.qualifier) {
            entity.qualifierId = data.qualifier.id;
            entity.qualifierValue = data.qualifier.value;
        }

        if (data.value.entity) {
            entity.valueEntityId = data.value.entity.id;
        }

        return entity;
    }

}