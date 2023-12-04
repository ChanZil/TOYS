const { Schema, model, Types } = require("mongoose");

const toyScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Toy = model("Toy", toyScheme);
module.exports.Toy = Toy;