const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "user"
    },
    book: { 
        type: [Schema.Types.ObjectId], 
        ref: "book"
    },
    comment: {
        type: String,
        required: true
    }
})

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = CommentModel;
