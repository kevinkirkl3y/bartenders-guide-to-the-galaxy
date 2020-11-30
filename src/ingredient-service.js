export default class IngredientService {
  static async getDrink(typeSearch, symbol, query) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/${typeSearch}.php?${symbol}=${query}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      })
  }
}