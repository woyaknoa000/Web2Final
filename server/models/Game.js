const { Schema, model } = require('mongoose')

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    console: {
        type: String,
        required: true
    },
    case: {
        type: Boolean,
        required: true
    },
    manual: {
        type: Boolean,
        required: true
    }
})

const Game = model('game', GameSchema)

module.exports = Game