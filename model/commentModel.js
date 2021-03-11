const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "users"
    },
    book: { 
        type: Schema.Types.ObjectId, 
        ref: "books"
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = CommentModel;
