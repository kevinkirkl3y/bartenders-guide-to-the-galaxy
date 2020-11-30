import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchName from './js/name-service.js';

function showResponse (drink) {
  if(response.drinks[0].strDrink) {
    $('.showResponse').append(``)
  } else {
  $('.showErrors').append(`<p>`)
  }
}

$(document).ready(function() {
  //$('').submit(function() { 
  let drink = "White Russian";
  (async function() {
    const response = await SearchName.getDrinksByName(drink);
    showResponse(drink);
    console.log(response.drinks[0].strDrink);
  })();
});