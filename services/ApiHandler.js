// service/index.js
const axios = require('axios');

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes'
    });
  }

  getAllRecipes = () => this.api.get('/complexSearch?number=100&apiKey=83248dbd4b4a4da0b63e553ceb90e0db');
  getRecipesWithIngredients = (ingredients) => this.api.get (`/findByIngredients?number=100&apiKey=83248dbd4b4a4da0b63e553ceb90e0db&ingredients=${ingredients}`);
  getOneRecipe = (id) => this.api.get(`/${id}/information?apiKey=83248dbd4b4a4da0b63e553ceb90e0db`)
}


module.exports = RecipesApi;
