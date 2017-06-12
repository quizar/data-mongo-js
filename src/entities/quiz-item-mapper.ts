
import { QuizItem } from './quiz-item';
import { Mapper } from './mapper';
import { QuizItem as DomainQuizItem, PropertyValueType } from 'quizar-domain';

export class QuizItemMapper extends Mapper<QuizItem, DomainQuizItem> {

    fromDataEntityImp(data: QuizItem): DomainQuizItem {
        const entity: DomainQuizItem = {
            propertyId: data.propertyId,
            title: data.title,
            question: data.question,
            description: data.description,
            lang: data.lang
        };

        if (data.entityId) {
            entity.entity = { id: data.entityId };
        }

        if (data.value) {
            entity.value = { value: data.value, type: <PropertyValueType>data.valueType };

            if (data.valueEntityId) {
                entity.value.entity = { id: data.valueEntityId };
            }
        }

        if (data.imageData) {
            entity.image = { data: data.imageData, propertyId: data.imageType };
        }

        if (data.qualifierId) {
            entity.qualifier = { id: data.qualifierId, type: <PropertyValueType>data.qualifierType, value: data.qualifierValue };
        }

        return entity;
    }

    toDataEntityImp(data: DomainQuizItem): QuizItem {
        const entity: QuizItem = {
            propertyId: data.propertyId,
            title: data.title,
            question: data.question,
            description: data.description
        };

        if (data.entity) {
            entity.entityId = data.entity.id;
            entity.lang = entity.lang || data.entity.lang;
        }

        if (data.value) {
            entity.value = data.value.value;
            entity.valueType = data.value.type;

            if (data.value.entity) {
                entity.valueEntityId = data.value.entity.id;
            }
        }

        if (data.image) {
            entity.imageData = data.image.data;
            entity.imageType = data.image.propertyId;
        }

        if (data.qualifier) {
            entity.qualifierId = data.qualifier.id;
            entity.qualifierType = data.qualifier.type;
            entity.qualifierValue = data.qualifier.value;
        }

        return entity;
    }

}
