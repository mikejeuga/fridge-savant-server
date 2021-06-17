const mongoose = require("mongoose");

const BookmarkSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  recipeId: {
    type: mongoose.Schema.Types.String,
  },
});

module.exports = mongoose.model("bookmark", BookmarkSchema);
