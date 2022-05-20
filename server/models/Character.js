const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    type: {
      type: String,
      default: "hero",
    },
    character_name: {
      type: String,
      required: true,
    },
    player_name: String,
    level: Number,
    race: String,
    class: String,
    armor_class: Number,
    hit_points: Number,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Character = model("Character", characterSchema);

module.exports = { Character, characterSchema };
