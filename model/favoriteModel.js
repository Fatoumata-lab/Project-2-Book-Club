const mongoose = require("mongoose");
const { schema } = require("./bookModel"); // to check
const Schema = mongoose.Schema;

const favoriteSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "users"
    },
    book: { // to put in an array
        type: Schema.Types.ObjectId, 
        ref: "books"
    },
})

const FavoriteModel = mongoose.model("favorites", favoriteSchema);

module.exports = FavoriteModel;
