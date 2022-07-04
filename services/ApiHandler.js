// service/index.js
const axios = require('axios');

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes/complexSearch'
    });
  }

  getAllRecipes = () => this.api.get('?number=100&apiKey=057ed7cd00b748b58e922b5c1feb217c');

}


module.exports = RecipesApi;
