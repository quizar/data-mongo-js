
import { WikiEntitySchema } from './schemas'
import { Schema, Connection } from 'mongoose'
import { MongoModel } from './model'
import { IPlainObject } from '../utils'

export type EntityCategory = {
    id?: string
    name?: string
}

export type WikiEntity = {
    id?: string
    lang?: string
    label?: string
    description?: string
    aliases?: string[]
    props?: IPlainObject<string>
    types?: string[]
    pageTitle?: string
    extract?: string
    categories?: EntityCategory[]
}

export class WikiEntityModel extends MongoModel<WikiEntity> {
    constructor(connection: Connection) {
        const model = connection.model('WikiEntity', WikiEntitySchema)
        super(model)
    }
}
