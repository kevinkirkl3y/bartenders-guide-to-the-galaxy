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
    let values = Object.values(response.drinks[i]).map((value)=> `<option value=${value.replace(" ", "+")}>${value}</option>`);
    $('select').append(values);
  }
}

function cardDisplay(array) {
  const drinkCards = array.map((element) => 
    `<div class="card">
      <div class="card-title" id="card-name"> ${element.strDrink} </div>
      <img class="card-img-top" src="${element.strDrinkThumb}" alt="Card image cap">
      <button class="btn btn-sm" id="${element.idDrink}" type="submit" value="${element.strDrink}">Get Recipe</button>
      <div id="recipe"></div>
    </div>`); 
    console.log(drinkCards)
  return drinkCards;
  
}
 

function displayDrinks(response) { //does this accurately display drinks?!
  let drinkArray = [];
  if (response.length< 10) { 
    for (let i=0; i< response.length; i++) {
      drinkArray.push(response[i]);
    } 
    return drinkArray;
  } else {  
    let mySet = new Set(); //empty object
    for (let i=0; i<10; i++) { 
      let j = Math.floor(Math.random() * response.length); //random number * length
      if(mySet.has(j)){ 
        i--;
      } else {
        mySet.add(j);
        drinkArray.push(response[j]);
      }
    }
    return drinkArray;
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
    return drinkList; //We need this for the purposes of returning this array below the click function. 
  } else {
    $('.showErrors').append(`<p>`);
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
      displayErrors(error.message);
    });
  $('#ingredientsSearchButton').click(function() {
    event.preventDefault();
    clearFields();
    $('#resultsBody').show();
    //search by API called ingredient
    let ingredient = $('#ingredients').val();
    DrinksByIngredient.findDrink(ingredient)
      .then(function(drinkResponse) {
        if (drinkResponse instanceof Error) {
          throw Error(`CocktailDB API error: ${drinkResponse.message}`);
        }
        const drinkListByIngredient = drinkResponse.drinks;
        let drinkArray = displayDrinks(drinkListByIngredient);
        let drinkCards = cardDisplay(drinkArray);
        $('#results').html(drinkCards);

        
        for (let i=0; i<drinkArray.length; i++) {
          $(`'#${drinkArray[i].idDrink}'`).click(function() {
            let drinkName = $('#ingToRecipe').val();
            console.log(drinkName);
            (async function searchNameResponse(drinkName) {
              const searchNameResponse = await SearchName.getDrinksByName(drinkName);
              let drinkList = showDrinkByName(searchNameResponse);
              let drinkInfo = showDrinkInformation(searchNameResponse);
              let drinkAndInfo = [
                `<div class="card" id="drinkAndInfo">
                <div class="card-title">${drinkList}:</div>
                <div class="card-body">${drinkInfo}</div>
                </div>`];
                
              $('#recipe').html(`<p>${drinkAndInfo.join(" ")}</p>`); 
            })();

          });
        }
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
  $('#nameSearchButton').click(function() {
    event.preventDefault();
    clearFields();
    let drinkName = $('#findDrink').val();
    $("#drinkListDisplay").val();
    $("#resultsBody").show();
    (async function searchNameResponse() {
      const searchNameResponse = await SearchName.getDrinksByName(drinkName);
      let drinkList = showDrinkByName(searchNameResponse);
      let drinkInfo = showDrinkInformation(searchNameResponse);
      let drinkAndInfo = [];
      for(let i=0; i<drinkList.length; i++) {
        drinkAndInfo.push(`
        <div class="card" id="drinkAndInfo">
          <div class="card-title">${drinkList[i]}:</div>
          <div class="card-body">${drinkInfo[i]}</div>
        </div>`);
      }
      $('#drinkListDisplay').html(`<p>${drinkAndInfo.join(" ")}</p>`); 
    })();
  });
  
});

