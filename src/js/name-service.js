export default class SearchName {
  static async getDrinksByName(drinkName) {
    try {
      const searchNameResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
      if (!searchNameResponse.ok) {
        throw Error(searchNameResponse.statusText);
      }
      return searchNameResponse.json();
    } catch (error) {
      return error.message;
    }
  }  
}