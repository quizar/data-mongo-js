
import { QuizItemSchema } from './schemas'
import { Schema, Connection } from 'mongoose'
import { MongoModel } from './model'
import { PlainObject } from '../utils'
import { MapperContainer } from './mapper-container';

export type QuizItem = {
    id?: string
    lang?: string
    entityId?: string
    propertyId?: string
    valueType?: string
    value?: string
    valueEntityId?: string

    qualifierType?: string
    qualifierId?: string
    qualifierValue?: string

    title?: string
    question?: string
    description?: string
    imageData?: string
    imageType?: string

    createdAt?: number
    updatedAt?: number
};

const quizItemTypeInfo = MapperContainer.createType('QuizItem');

quizItemTypeInfo.add('id');
quizItemTypeInfo.add('lang');
quizItemTypeInfo.add('entity.id', 'entityId');
quizItemTypeInfo.add('propertyId');
quizItemTypeInfo.add('value.type', 'valueType');
quizItemTypeInfo.add('value.value', 'value');
quizItemTypeInfo.add('value.entity.id', 'valueEntityId');
quizItemTypeInfo.add('qualifier.type', 'qualifierType');
quizItemTypeInfo.add('qualifier.value', 'qualifierValue');
quizItemTypeInfo.add('qualifier.id', 'qualifierId');
quizItemTypeInfo.add('image.data', 'imageData');
quizItemTypeInfo.add('image.propertyId', 'imageType');
quizItemTypeInfo.add('title');
quizItemTypeInfo.add('topics[].id', 'topicsIds[]');
quizItemTypeInfo.add('createdAt');
quizItemTypeInfo.add('updatedAt');

export class QuizItemModel extends MongoModel<QuizItem> {
    constructor(connection: Connection) {
        const model = connection.model('QuizItem', QuizItemSchema)
        super(model)
    }
}
