const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    title: String,
    summary: String,
    image: String,
    ingredients: String,
    steps:  [{	
      type: String
    }],
    apiId: Number
  },
  {
    timestamps: true,
  }
);

// const Character = model("Character", userSchema);

module.exports = model("Recipe", recipeSchema);
