
import { TABLES_PREFIX } from '../utils'
import { Schema } from 'mongoose'

/**
 * QuizItemSchema
 */
export const QuizItemSchema = new Schema({
    // hash(entityId, propertyId)
    _id: String,
    title: {
        type: String,
        match: /^[\S]+[ ][\S]{3,100}/,
        required: true
    },
    lang: {
        type: String,
        match: /^[a-z]{2}$/,
        lowercase: true,
        required: true
    },
    userId: {
        type: String,
        trim: true,
        maxlength: 40,
        minlength: 1,
        required: true
    },

    sources: {
        type: [Schema.Types.Mixed]
    },

    tags: {
        type: [Schema.Types.Mixed]
    },

    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
        collection: [TABLES_PREFIX, 'quiz-item'].join('_')
    });

QuizItemSchema.set('toObject', {
    getters: true
});
