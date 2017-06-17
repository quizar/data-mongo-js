
import { QuizItemSchema } from './schemas'
import { Schema, Connection } from 'mongoose'
import { MongoModel } from './model'
import { PlainObject } from '../utils'

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

export class QuizItemModel extends MongoModel<QuizItem> {
    constructor(connection: Connection) {
        const model = connection.model('QuizItem', QuizItemSchema)
        super(model)
    }
}
