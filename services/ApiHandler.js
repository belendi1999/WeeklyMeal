// service/index.js
const axios = require('axios');

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes'
    });
  }

  getAllRecipes = () => this.api.get('/complexSearch?number=10&apiKey=057ed7cd00b748b58e922b5c1feb217c');
  getOneRecipe = (ingredients) => this.api.get (`/findByIngredients?number=10&apiKey=057ed7cd00b748b58e922b5c1feb217c&ingredients=${ingredients}`);
}


module.exports = RecipesApi;
