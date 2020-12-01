import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchName from './js/name-service.js';
import IngredientService from './js/ingredient-service.js';
import DrinksByIngredient from './js/cocktail-by-ingredient-service'

function getIngredients(response) {
  let values = Object.values(response.drinks).map((value)=> `<option value=${value}>${value}</option>`);
  $('select').append(values);
}

function displayDrinks(response) { //does this accurately display drinks?!
  for (let i=0; i<10; i++) {
    let j = Math.floor(Math.random() * response.drinks.length)
    $('.drink-results').append(response.drinks[j].strDrink)
  }
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function showResponse (drink) {
  if(response.drinks[0].strDrink) {
    $('.showResponse').append(``)
  } else {
  $('.showErrors').append(`<p>`)
  }
}

$(document).ready(function() {
  IngredientService.getAllIngredients()
    .then(function(cocktailResponse) {
      if(cocktailResponse instanceof Error) {
        throw Error(`Cocktail DB API error: ${cocktailResponse.message}`);
      }
      getIngredients(cocktailResponse); 
    })
    .catch(function(error) {
      displayErrors(error.message)
    })
  $('#findDrink').click(function() {
    let ingredient = $('#ingredient').val();
    DrinksByIngredient.findDrink(ingredient)
      .then(function(drinkResponse) {
        if (drinkResponse instanceof Error) {
          throw Error(`CocktailDB API error: ${drinkResponse.message}`);
        }
        const drinkListByIngredient = drinkResponse.drinks;
        displayDrinks(drinkListByIngredient);
      })
      .catch(function(error) {
        displayErrors(error.message)
      })
    let drink = "White Russian";
    (async function() {
      const response = await SearchName.getDrinksByName(drink);
      showResponse(drink);
      console.log(response.drinks[0].strDrink);
    })();
  })
});
