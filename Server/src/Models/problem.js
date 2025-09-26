const mongoose = require('mongoose')
const {Schema} = mongoose


const problemSchema = new Schema({

    title: {
        type: String,
        unique: true,
    },

    description: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },

    tags: {
        type: 'Array',
        required: true,
        enum: ['LinkedList', 'Graph', "Dynamic Programming", 'Stack', 'Queue', 'Array', 'Math']
    },

    visibleTestCases: [
        {
            input: {
                type: String,
                required: true
            },

            output: {
                type: String,
                required: true
            },

            explanation: {
                type: String,
                required: true
            }
        }
    ],

    hiddenTestCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ],

    startCode: [
        {
            language: {
                type: String,
                required: true
            },
            initialCode: {
                type: String,
                required: true
            }
        }
    ],

    referenceSolution: [
        {
            language: {
                type: String,
                required: true
            },
            completeCode: {
                type: String,
                required: true
            }
        }
    ],

    problemCreator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

}, {timestamps: true})


const Problem = mongoose.model('problem', problemSchema)
module.exports = Problem