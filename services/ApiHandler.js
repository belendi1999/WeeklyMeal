// service/index.js
const axios = require('axios');

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes'
    });
  }

  getAllRecipes = () => this.api.get('/complexSearch?number=100&apiKey=2eeee54314954b658a830fb77ad646dc');
  getRecipesWithIngredients = (ingredients) => this.api.get (`/findByIngredients?number=100&apiKey=2eeee54314954b658a830fb77ad646dc&ingredients=${ingredients}`);
  getOneRecipe = (id) => this.api.get(`/${id}/information?apiKey=057ed7cd00b748b58e922b5c1feb217c`)
}


module.exports = RecipesApi;
