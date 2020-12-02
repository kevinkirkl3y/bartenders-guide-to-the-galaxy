export default class DrinksByIngredient {
  static async findDrink(query) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`)
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