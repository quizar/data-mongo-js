
import { TABLES_PREFIX } from '../utils'
import { Schema } from 'mongoose'

/**
 * QuizItemSchema
 */
export const QuizItemSchema = new Schema({
    // hash(entityId, propertyId)
    _id: String,
    lang: {
        type: String,
        match: /^[a-z]{2}$/,
        lowercase: true,
        required: true
    },
    entityId: {
        type: String,
        trim: true,
        match: /^Q\d+$/,
        maxlength: 40,
        required: true
    },
    propertyId: {
        type: String,
        trim: true,
        match: /^P\d+$/,
        maxlength: 40,
        required: true
    },
    valueType: {
        type: String,
        trim: true,
        maxlength: 20,
        required: true,
        enum: ['STRING', 'NUMBER', 'ENTITY']
    },
    value: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true
    },
    valueEntityId: {
        type: String,
        trim: true,
        match: /^Q\d+$/,
        maxlength: 40
    },

    qualifierType: {
        type: String,
        trim: true,
        maxlength: 20,
        enum: ['STRING', 'NUMBER', 'ENTITY']
    },
    qualifierValue: {
        type: String,
        trim: true,
        maxlength: 200
    },
    qualifierId: {
        type: String,
        trim: true,
        match: /^Q\d+$/,
        maxlength: 40
    },

    title: {
        type: String,
        maxlength: 400
    },
    question: {
        type: String,
        maxlength: 400
    },
    description: {
        type: String,
        maxlength: 400
    },

    imageData: {
        type: String,
        maxlength: 400
    },
    imageType: {
        type: String,
        trim: true,
        maxlength: 40
    },

    updatedAt: {
        type: Number
    },
    createdAt: {
        type: Number,
        default: Date.now,
        required: true
    }
}, {
        collection: [TABLES_PREFIX, 'quiz-items'].join('_')
    });

QuizItemSchema.set('toObject', {
    getters: true
});

/**
 * WikiEntitySchema
 */
export const WikiEntitySchema = new Schema({
    _id: String,
    label: {
        type: String,
        match: /^Q\d+$/,
        required: true
    },
    lang: {
        type: String,
        match: /^[a-z]{2}$/,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 200
    },

    aliases: {
        type: [String]
    },

    props: {
        type: Schema.Types.Mixed
    },

    types: {
        type: [String]
    },

    pageTitle: {
        type: String,
        trim: true,
        maxlength: 400
    },
    extract: {
        type: String,
        trim: true,
        maxlength: 400
    },

    categories: {
        type: [Schema.Types.Mixed]
    },

    updatedAt: {
        type: Number
    },
    createdAt: {
        type: Number,
        default: Date.now,
        required: true
    }
}, {
        collection: [TABLES_PREFIX, 'wiki-entities'].join('_')
    });

WikiEntitySchema.set('toObject', {
    getters: true
});

/**
 * QuizSchema
 */
export const QuizSchema = new Schema({
    // hash(entityId, propertyId)
    _id: String,
    target: {
        type: String,
        enum: ['PVALUE', 'QVALUE'],
        required: true
    },
    lang: {
        type: String,
        match: /^[a-z]{2}$/,
        lowercase: true,
        required: true
    },
    title: {
        type: String,
        maxlength: 400
    },
    question: {
        type: String,
        maxlength: 400
    },
    description: {
        type: String,
        maxlength: 400
    },

    imageData: {
        type: String,
        maxlength: 400
    },
    imageType: {
        type: String,
        trim: true,
        maxlength: 40
    },
    items: {
        type: [Schema.Types.Mixed]
    },
    updatedAt: {
        type: Number
    },
    createdAt: {
        type: Number,
        default: Date.now,
        required: true
    }
}, {
        collection: [TABLES_PREFIX, 'quizzes'].join('_')
    });

QuizSchema.set('toObject', {
    getters: true
});