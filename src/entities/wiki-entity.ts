
import { WikiEntitySchema } from './schemas'
import { Schema, Connection } from 'mongoose'
import { MongoModel } from './model'
import { IPlainObject } from '../utils'
// import { WikiEntityType } from 'quizar-domain';

export type WikiEntity = {
    id?: string
    lang?: string
    label?: string
    description?: string
    aliases?: string[]
    props?: IPlainObject<string>
    types?: string[]
    type?: string
    pageTitle?: string
    pageId?: number
    extract?: string
    name?: string
    cc2?: string
    rank?: number
}

export class WikiEntityModel extends MongoModel<WikiEntity> {
    constructor(connection: Connection) {
        const model = connection.model('WikiEntity', WikiEntitySchema)
        super(model)
    }
}
