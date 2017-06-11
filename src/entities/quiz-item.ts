
import { QuizItemSchema } from './schemas'
import { Schema, Connection } from 'mongoose'
import { MongoModel } from './model'

export type QuizItemEntity = {
    id?: string
    entityId: string
    propertyId: string
    valueType: string
    value: string
    valueEntityId?: string

    qualifierId?: string
    qualifierValue?: string

    target: string

    title?: string
    question?: string
    description?: string
    imageData?: string
    imageTypeId?: string

    createdAt?: number
    updatedAt?: number
}

export class QuizItemModel extends MongoModel<QuizItemEntity> {
    constructor(connection: Connection) {
        const model = connection.model('QuizItem', QuizItemSchema)
        super(model)
    }
}
