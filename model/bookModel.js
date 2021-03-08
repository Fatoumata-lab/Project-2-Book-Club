const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: String,
    author: String,
    year: Number,
    genre: [String],
    synopsis: String,
    comment: [String],
    rating: Number,
    cover: String
})

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel;
