const { Schema, model } = require("mongoose");
const { characterSchema } = require("./Character");
const { monsterSchema } = require("./Monster");

const battleSchema = new Schema(
  {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    heroes: [characterSchema],
    monsters: [monsterSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Battle = model("Battle", battleSchema);

module.exports = { Battle, battleSchema };
