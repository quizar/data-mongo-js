
import { QuizSchema } from './schemas'
import { Schema, Connection } from 'mongoose'
import { MongoModel } from './model'

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

export class QuizModel extends MongoModel<Quiz> {
    constructor(connection: Connection) {
        const model = connection.model('Quiz', QuizSchema)
        super(model)
    }
}

