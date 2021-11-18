let coll = document.getElementsByClassName('collapsible');
let add = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let resetBtn = document.getElementById('recipeResetBtn');
let i;
// incrementor for new specs id
// starts at 1 because initial field is 0

let collapsingFunction = function () {
    this.classList.toggle('active');
    let content = this.nextElementSibling;
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block'
    }
}

for (i = 0; i < coll.length; i += 1) {
    coll[i].addEventListener("click", collapsingFunction)
}

let newSpecsIndex = 1;

let divArray = [];

isOnRecipePage = true;
console.log(isOnRecipePage);

const recipeListEventListener = document.getElementById('recipe-list-grid');
recipeListEventListener.addEventListener('click', renderRecipeCard);


renderThumbnails(Cocktail.userRecipes);

let addFunction = function (event) {

    event.preventDefault()
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

    console.log('newSpecDiv Id: ' + newSpecDiv);
    console.log('newSpecsIndex count before increment: ' + newSpecsIndex);

    newSpecsIndex += 1;

    console.log('newSpecsIndex count after increment: ' + newSpecsIndex);
}

add.addEventListener('click', addFunction)

let index = 0;

let minusFunction = function (event) {

    event.preventDefault();
    const specForm = document.getElementById('inputSpecs');
    console.log('specForm.lastChild: ' + specForm.lastChild.id)
    // will throw error if no new spec fields created
    console.log('divArray before pop(): ' + divArray);
    if (divArray.length > 0) {
        divArray.pop();
        specForm.lastChild.remove();
        newSpecsIndex -= 1;
    }
    console.log('newSpecsIndex current count: ' + newSpecsIndex);
}

minusBtn.addEventListener('click', minusFunction);


const form = document.getElementById('recipe-submit');
form.addEventListener('submit', addRecipeHandler);
form.addEventListener('reset', handleResetClick);

function addRecipeHandler(event) {
    //call showNewRecipeForm()
    // event.preventDefault();
    newRecipeFormSubmit();
    showNewRecipeForm();
    clearForm();
    clearChildren('recipe-list-grid');
    renderThumbnails(Cocktail.userRecipes);
}

const form = document.getElementById('recipe-submit');
form.addEventListener('submit', addRecipeHandler);
form.addEventListener('reset', handleResetClick);

function newRecipeFormSubmit() {
    // calls new Cocktail construtor
    // pushes form values into Cocktail constructor
    // grab field input

    const name = form.recipename.value;
    const base = form.base.value;
    const glassware = form.glassware.value;
    const instructions = form.instruct.value;
    const notes = form.notes.value;

    let ingrArray = [];
    let amntArray = [];
    // put ingr and amount into arrays
    for (let i = 0; i < newSpecsId; i += 1) {
        const ingr = document.getElementById(`specs-ingr-${i}`).value;
        ingrArray.push(ingr);
        console.log('ingrArray: ' + ingrArray);
        const amnt = document.getElementById(`specs-amnt-${i}`).value;
        amntArray.push(amnt);
        console.log('amntArray: ' + amntArray);
    }

    const newCocktail = new Cocktail(name, base, ingrArray, amntArray, glassware, instructions, notes);

    console.log(newCocktail);
    console.log('newCocktail Instructions: ' + newCocktail.instructions);

    Cocktail.userRecipes.push(newCocktail);
    saveToLocalStorage(Cocktail.userRecipes);

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
