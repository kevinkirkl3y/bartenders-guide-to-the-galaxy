import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchName from './js/name-service.js';
import IngredientService from './js/ingredient-service.js';
import DrinksByIngredient from './js/cocktail-by-ingredient-service';
// import DrinkInfo from './js/drinkInfoService.js';

function getIngredients(response) {
  for (let i=1; i <= response.drinks.length - 1; i += 1) {
    let values = Object.values(response.drinks[i]).map((value)=> `<option value=${value}>${value}</option>`);
    $('select').append(values);
  }
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

export function showDrinkByName (searchNameResponse) {
  if(searchNameResponse.drinks[0].strDrink) {
    let drinkList = [];
    for (let d = 0; d<searchNameResponse.drinks.length; d++) {
      drinkList.push(searchNameResponse.drinks[d].strDrink);
    }
    console.log(drinkList); // This will be where/how our drink names will be displayed. We would like them clickable so they pull up further info when selected. 
  } else {
  $('.showErrors').append(`<p>`)
  }
}
function showDrinkInformation (searchNameResponse) {
  if(searchNameResponse.drinks[0].strDrink) {
    let drinkInfo = [];
    for (let i =0; i<searchNameResponse.drinks.length; i++ ) { 
      
      let instructions = searchNameResponse.drinks[i].strInstructions;
      let m1 = searchNameResponse.drinks[i].strMeasure1;
      let i1 = searchNameResponse.drinks[i].strIngredient1;
      let m2 = searchNameResponse.drinks[i].strMeasure2;
      let i2 = searchNameResponse.drinks[i].strIngredient2;
      let m3 = searchNameResponse.drinks[i].strMeasure3;
      let i3 = searchNameResponse.drinks[i].strIngredient3;
      let m4 = searchNameResponse.drinks[i].strMeasure4;
      let i4 = searchNameResponse.drinks[i].strIngredient4;
      let m5 = searchNameResponse.drinks[i].strMeasure5;
      let i5 = searchNameResponse.drinks[i].strIngredient5;
      let m6 = searchNameResponse.drinks[i].strMeasure6;
      let i6 = searchNameResponse.drinks[i].strIngredient6;
      let m7 = searchNameResponse.drinks[i].strMeasure7;
      let i7 = searchNameResponse.drinks[i].strIngredient7;
      let m8 = searchNameResponse.drinks[i].strMeasure8;
      let i8 = searchNameResponse.drinks[i].strIngredient8;
      let m9 = searchNameResponse.drinks[i].strMeasure9;
      let i9 = searchNameResponse.drinks[i].strIngredient9;
      let m10 = searchNameResponse.drinks[i].strMeasure10;
      let i10 = searchNameResponse.drinks[i].strIngredient10;
      let m11 = searchNameResponse.drinks[i].strMeasure11;
      let i11 = searchNameResponse.drinks[i].strIngredient11;
      let m12 = searchNameResponse.drinks[i].strMeasure12;
      let i12 = searchNameResponse.drinks[i].strIngredient12;
      let m13 = searchNameResponse.drinks[i].strMeasure13;
      let i13 = searchNameResponse.drinks[i].strIngredient13;
      let m14 = searchNameResponse.drinks[i].strMeasure14;
      let i14 = searchNameResponse.drinks[i].strIngredient14;
      let m15 = searchNameResponse.drinks[i].strMeasure15;
      let i15 = searchNameResponse.drinks[i].strIngredient15;

      if ( m15 !== null && i15 !== null) {
        drinkInfo.push(`${instructions} Use ${m1}  ${i1} , ${m2}  ${i2} , ${m3}  ${i3} , ${m4}  ${i4} , ${m5}  ${i5} , ${m6}  ${i6} , ${m7}  ${i7} , ${m8}  ${i8} , ${m9}  ${i9} , ${m10}  ${i10} , ${m11}  ${i11} , ${m12}  ${i12} , ${m13}  ${i13} , ${m14}  ${i14} , ${m15}  ${i15}`);
      } else if ( m14 !== null && i14 !== null) {
        drinkInfo.push(`${instructions} Use ${m1}  ${i1} , ${m2}  ${i2} , ${m3}  ${i3} , ${m4}  ${i4} , ${m5}  ${i5} , ${m6}  ${i6} , ${m7}  ${i7} , ${m8}  ${i8} , ${m9}  ${i9} , ${m10}  ${i10} , ${m11}  ${i11} , ${m12}  ${i12} , ${m13}  ${i13} , ${m14}  ${i14}`);  
      } else if ( m13 !== null && i13 !== null) {
        drinkInfo.push(`${instructions} Use ${m1}  ${i1} , ${m2}  ${i2} , ${m3}  ${i3} , ${m4}  ${i4} , ${m5}  ${i5} , ${m6}  ${i6} , ${m7}  ${i7} , ${m8}  ${i8} , ${m9}  ${i9} , ${m10}  ${i10} , ${m11}  ${i11} , ${m12}  ${i12} , ${m13}  ${i13}`);
      } else if ( m12 !== null && i12 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4}, ${i4}, ${m5} ${i5}, ${m6} ${i6}, ${m7} ${i7}, ${m8} ${i8}, ${m9} ${i9}, ${m10} ${i10}, ${m11} ${i11}, ${m12} ${i12}`);
      } else if ( m11 !== null && i11 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} of ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}, ${m6} ${i6}, ${m7} ${i7}, ${m8} ${i8}, ${m9} ${i9}, ${m10} ${i10}, ${m11} ${i11}`);
      } else if ( m10 !== null && i10 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}, ${m6} ${i6}, ${m7} ${i7}, ${m8} ${i8}, ${m9} ${i9}, ${m10} ${i10}`);
      } else if ( m9 !== null && i9 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}, ${m6} ${i6}, ${m7} ${i7}, ${m8} ${i8}, ${m9} ${i9}`);
      } else if ( m8 !== null && i8 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}, ${m6} ${i6}, ${m7} ${i7}, ${m8} ${i8}`);
      } else if ( m7 !== null && i7 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2}  ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}, ${m6} ${i6}, ${m7} ${i7}`);
      } else if ( m6 !== null && i6 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}, ${m6} ${i6}`);
      } else if ( m5 !== null && i5 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}, ${m5} ${i5}`);
      } else if ( m4 !== null && i4 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1},  ${m2} ${i2}, ${m3} ${i3}, ${m4} ${i4}`);
      } else if (m3 !== null && i3 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}, ${m3} ${i3}`);
      } else if (m2 !== null && i2 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}, ${m2} ${i2}`);
      } else if (m1 !== null && i1 !== null) {
        drinkInfo.push(`${instructions} Use ${m1} ${i1}`);
      } else {
        return "That drink does not exist";
      }
    }
    console.log(drinkInfo); //This will be attached to the toggle functionality of the showDrinkByName response. Providing information after drink has been selected. 
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
  })
  let drinkName = "long island"; // $('#name').val();
  (async function() {
    const searchNameResponse = await SearchName.getDrinksByName(drinkName);
    showDrinkByName(searchNameResponse);
    showDrinkInformation(searchNameResponse);
  })();
});