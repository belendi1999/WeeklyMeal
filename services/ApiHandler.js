// service/index.js
const axios = require('axios');

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes'
    });
  }

  getAllRecipes = () => this.api.get('/complexSearch?number=100&apiKey=bdce14a4615f45e39633595ae2852d3d ');
  getRecipesWithIngredients = (ingredients) => this.api.get (`/findByIngredients?number=100&apiKey=bdce14a4615f45e39633595ae2852d3d&ingredients=${ingredients}`);
  getOneRecipe = (id) => this.api.get(`/${id}/information?apiKey=bdce14a4615f45e39633595ae2852d3d `)
}


module.exports = RecipesApi;
