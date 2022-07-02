// service/index.js
const axios = require('axios');

class CharactersApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.edamam.com/api/recipes/v2'
    });
  }

  getAllCharacters = () => this.api.get('?type=public&q=pasta&app_id=d569f124&app_key=fe0597d512f178c092e803981c8dc8a2');

}


module.exports = CharactersApi;
