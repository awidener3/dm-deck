const { Schema, model } = require("mongoose");
const { battleSchema } = require("./Battle");

const collectionSchema = new Schema(
  {
    name: String,
    battles: { type: [battleSchema], unique: true },
    background_img: String,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = { Collection, collectionSchema };
