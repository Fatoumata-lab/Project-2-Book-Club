const mongoose = require("mongoose");
const { schema } = require("./bookModel"); // to check
const Schema = mongoose.Schema;

const favoriteSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "user"
    },
    book: { // to put in an array
        type: [Schema.Types.ObjectId], 
        ref: "book"
    },
})

const FavoriteModel = mongoose.model("favorites", favoriteSchema);

module.exports = FavoriteModel;
