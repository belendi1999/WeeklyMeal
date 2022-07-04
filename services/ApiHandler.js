// service/index.js
const axios = require('axios');

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes'
    });
  }

  getAllRecipes = () => this.api.get('/complexSearch?number=10&apiKey=2eeee54314954b658a830fb77ad646dc');
  getOneRecipe = (ingredients) => this.api.get (`/findByIngredients?number=10&apiKey=2eeee54314954b658a830fb77ad646dc&ingredients=${ingredients}`);
}


module.exports = RecipesApi;
