const { Schema, model } = require("mongoose");
const { battleSchema } = require("./Battle");

const collectionSchema = new Schema(
  {
    name: String,
    background_img: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    battles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Battle",
      },
    ],
    // battles: { type: [battleSchema], unique: true },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = { Collection, collectionSchema };
