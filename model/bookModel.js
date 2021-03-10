const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var random = require('mongoose-simple-random');


const bookSchema = new Schema ({
    title: String,
    author: String,
    year: Number,
    genre: [String],
    synopsis: String,
    comment: {
        type: Schema.Types.ObjectId, 
        ref: "comment"
    },
    rating: Number,
    cover: String
})

// bookSchema.plugin(random);

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel;
