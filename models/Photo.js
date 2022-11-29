const {model, Schema } = require('mongoose')

const PhotoSchema = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
})

module.exports = model('Photo', PhotoSchema)