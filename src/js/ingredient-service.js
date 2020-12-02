export default class IngredientService {
  static async getAllIngredients() {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}
