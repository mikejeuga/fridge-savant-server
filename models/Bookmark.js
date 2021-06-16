const mongoose = require('mongoose')


const BookmarkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    recipeId: {
        type: String,
        required: false,
        unique: true
    },

    recipeTitle: {
        type: String,
    },

    recipeBody: {
        type: String,
    },

    recipeImage: {
        type: String,
    },
});


module.exports = mongoose.model('bookmark', BookmarkSchema);