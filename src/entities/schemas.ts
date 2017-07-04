
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
        required: true,
        index: true
    },
    propertyId: {
        type: String,
        trim: true,
        match: /^P\d+$/,
        maxlength: 40,
        required: true
    },
    propertyType: {
        type: String,
        trim: true,
        maxlength: 20,
        required: true,
        enum: ['STRING', 'NUMBER', 'ENTITY']
    },
    values: {
        type: [Schema.Types.Mixed],
        min: 1,
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

    topicsIds: {
        type: [String],
        index: true
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

    type: {
        type: String
    },

    pageId: {
        type: Number
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

    // categories: {
    //     type: [Schema.Types.Mixed]
    // },

    cc2: {
        type: String
    },

    rank: {
        type: Number
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
    topicsIds: {
        type: [String]
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