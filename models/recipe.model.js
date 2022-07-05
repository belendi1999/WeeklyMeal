const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    name: String,
    description: String,
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


recipeSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});


// const Character = model("Character", userSchema);

module.exports = model("Recipe", recipeSchema);
