let add = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let resetBtn = document.getElementById('recipeResetBtn');
let i;
let newSpecsIndex = 1;
let divArray = [];

let addFunction = function (event) {

    event.preventDefault();

    const specForm = document.getElementById('inputSpecs');
    const newSpecDiv = document.createElement('div');
    const newSpecIngrInput = document.createElement('input');
    const newSpecAmntInput = document.createElement('input');

    // assign div class and id
    newSpecDiv.setAttribute('class', 'ingr-amnt-div');
    newSpecDiv.setAttribute('id', `ingr-amnt-div-${newSpecsIndex}`);

    // append ingr and amnt fields to new div
    newSpecDiv.appendChild(newSpecAmntInput);
    newSpecDiv.appendChild(newSpecIngrInput);

    // set attributes for ingr and amnt fields
    // may not need id's, left in for now
    newSpecIngrInput.setAttribute('type', 'text');
    newSpecIngrInput.setAttribute('name', 'specs');
    newSpecIngrInput.setAttribute('id', `specs-ingr-${newSpecsIndex}`);
    newSpecIngrInput.setAttribute('placeholder', 'Ingredient...');
    newSpecIngrInput.required = 'true';

    newSpecAmntInput.setAttribute('type', 'text');
    newSpecAmntInput.setAttribute('name', 'specs');
    newSpecAmntInput.setAttribute('id', `specs-amnt-${newSpecsIndex}`);
    newSpecAmntInput.setAttribute('placeholder', 'Amount...');

    // append new div
    specForm.appendChild(newSpecDiv);

    divArray.push(newSpecDiv);

    newSpecsIndex += 1;
}

let minusFunction = function (event) {

    event.preventDefault();
    const specForm = document.getElementById('inputSpecs');
    if (divArray.length > 0) {
        divArray.pop();
        specForm.lastChild.remove();
        newSpecsIndex -= 1;
    }
}

add.addEventListener('click', addFunction)
minusBtn.addEventListener('click', minusFunction);

// function recipeEventListener() {
//     //listens for button click to add a recipe
//     const recipeSubmitBtn = document.getElementById('recipeSubmitBtn');
//     recipeSubmitBtn.addEventListener('click', addRecipeHandler);
// }

// recipeEventListener();

function showNewRecipeForm() {
    //changes CSS display styling to properly display the recipe card pop-up form
    // show pop-up card form
}

// Refactor to switch statement with one listener on recipe form
const form = document.getElementById('recipe-submit');
form.addEventListener('submit', addRecipeHandler);
form.addEventListener('reset', handleResetClick);

function addRecipeHandler(event) {
    //call showNewRecipeForm()
    event.preventDefault();
    newRecipeFormSubmit();
    clearForm();
}

function newRecipeFormSubmit() {
    // calls new Cocktail construtor
    // pushes form values into Cocktail constructor

    const name = form.recipename.value;
    const base = form.base.value;
    const glassware = form.glassware.value;
    const instructions = form.instruct.value;
    const notes = form.notes.value;

    let ingrArray = [];
    let amntArray = [];
    // put ingr and amount into arrays
    for (let i = 0; i < newSpecsIndex; i += 1) {
        const ingr = document.getElementById(`specs-ingr-${i}`).value;
        ingrArray.push(ingr);
        console.log('ingrArray: ' + ingrArray);
        const amnt = document.getElementById(`specs-amnt-${i}`).value;
        amntArray.push(amnt);
        console.log('amntArray: ' + amntArray);
    }

    // name, base, ingr = [], amount = [], glassware, instructions = "", notes = ""

    const newCocktail = new Cocktail(name, base, ingrArray, amntArray, glassware, instructions, notes);

    console.log(newCocktail);
    console.log('newCocktail Instructions: ' + newCocktail.instructions);

    Cocktail.userRecipes.push(newCocktail);
    saveToLocalStorage('Cocktail');

    //STRETCH: call filterFunction() if applicable new recipe will now show in filtered array
    //STRETCH: call renderFiltered() re-renders page so if new recipe meets requirements is now displayed on the page
}
function clearForm() {
    //clears all form fields
    const recipeForm = document.getElementById('recipe-submit');
    recipeForm.reset();
}

function handleResetClick() {
    // grab recipe specs parent div
    specsForm = document.getElementById('inputSpecs');
    // iterate through array and delete each additional amount/ingredient field
    for (let i = 0; i < divArray.length; i += 1) {
        specsForm.lastChild.remove();
    }
    // clear divArray
    divArray = [];
    // reset specs index counter
    newSpecsIndex = 1;
}