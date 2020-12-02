import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchName from './js/name-service.js';
import IngredientService from './js/ingredient-service.js';
import DrinksByIngredient from './js/cocktail-by-ingredient-service';
import showDrinkInformation from './js/drinkInfoService.js';

function clearFields() {
  $("#form-control search").val("");
  $("#results").text("");
  $("#drinkListDisplay").text("");
  $("#showErrors").text("");
}

function getIngredients(response) { //completed -jc
  for (let i=1; i <= response.drinks.length - 1; i += 1) {
    let values = Object.values(response.drinks[i]).map((value)=> `<option value=${value}>${value}</option>`);
    $('select').append(values);
  }
}

function displayDrinks(response) { //does this accurately display drinks?!
  if (response.length< 10) { 
    for (let i=0; i< response.length; i++) {
      $('.drink-results').append(response[i].strDrink);
    } 
  } else {  
    let mySet = new Set(); //empty object
    for (let i=0; i<10; i++) { 
      let j = Math.floor(Math.random() * response.length); //random number * length
      if(mySet.has(j)){ 
        i--
      } else {
        mySet.add(j);
        $('.drink-results').append(response[j].strDrink);
      }
    }
  }  
}

function displayErrors(error) {
  $('#showErrors').text(`${error}`);
}

function showDrinkByName (searchNameResponse) {
  if (searchNameResponse.drinks[0].strDrink) {
    let drinkList = [];
    for (let d = 0; d<searchNameResponse.drinks.length; d++) {
      drinkList.push(searchNameResponse.drinks[d].strDrink);
    }

    return $('#drinkListDisplay').text(`${drinkList}`);
  } else {
    $('.showErrors').append(`<p>`);
  }
}


$(document).ready(function() {
  $('#resultsBody').hide();
  IngredientService.getAllIngredients()
    .then(function(cocktailResponse) {
      if(cocktailResponse instanceof Error) {
        throw Error(`Cocktail DB API error: ${cocktailResponse.message}`);
      }
      getIngredients(cocktailResponse); 
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
  $('#searchButton').click(function() {
    event.preventDefault();
    clearFields();
    //search by API called ingredient
    let ingredient = $('#ingredients').val();
    DrinksByIngredient.findDrink(ingredient)
      .then(function(drinkResponse) {
        if (drinkResponse instanceof Error) {
          throw Error(`CocktailDB API error: ${drinkResponse.message}`);
        }
        const drinkListByIngredient = drinkResponse.drinks;
        displayDrinks(drinkListByIngredient);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
    //search by user inputted drink name
    // let drinkName = "White Russian";
    let drinkName = $('#findDrink').val();
    $("drinkListDisplay").val();
    $("#searchButton").val();
    $("#resultsBody").show();
    (async function() {
      const searchNameResponse = await SearchName.getDrinksByName(drinkName);
      showDrinkByName(searchNameResponse);
      console.log(showDrinkByName(searchNameResponse));
      showDrinkInformation(searchNameResponse);
      console.log(showDrinkInformation(searchNameResponse)); 
    })();
  });
});