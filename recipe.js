let add = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let resetBtn = document.getElementById('recipeResetBtn');
let i;
let newSpecsIndex = 1;
let divArray = [];

const recipeListEventListener = document.getElementById('recipe-list-grid');
recipeListEventListener.addEventListener('click', renderRecipeCard);

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

const form = document.getElementById('recipe-submit');
form.addEventListener('submit', addRecipeHandler);
form.addEventListener('reset', handleResetClick);

function addRecipeHandler(event) {
    //call showNewRecipeForm()
    event.preventDefault();
    newRecipeFormSubmit();
    renderThumbnails();
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

loadObjects();
function renderThumbnails(array = Cocktail.userRecipes) {
    //render array of allCocktails
    //render specifically the name and base property of Cocktail object
    array.forEach((e, index) => {
        const recipeList = document.getElementById('recipe-list-grid');
        let renderRecipe = document.createElement('div');
        let recipeTitle = document.createElement('h2');
        let recipeBase = document.createElement('p');

        recipeList.appendChild(renderRecipe);
        renderRecipe.setAttribute('class', 'recipe-card');
        renderRecipe.setAttribute('id', `${index}`);

        renderRecipe.appendChild(recipeTitle);
        recipeTitle.setAttribute('id', `${index}`);
        recipeTitle.innerHTML = `${e.name}`;
        // renderRecipe.innerHTML = `<h2>${e.name}</h2> <br>Base: ${e.base}`;
        renderRecipe.appendChild(recipeBase);
        recipeBase.setAttribute('id', `${index}`);
        recipeBase.innerHTML = `Base: ${e.base}`;
    })
}
renderThumbnails();

function renderRecipeCard(event) {
    //change from hidden to shown
    // TODO add event listener for nav left, right, return to list
    let array = Cocktail.userRecipes;

    let clicked = event.target.id;

    let recipeCard = document.getElementById('popup');
    let recipeCardbg = document.getElementById('popup-outline');
    let antiScroll = document.getElementById('body');

    let tempRecipe = array[clicked];

    if (tempRecipe) {

        antiScroll.classList.add('no-scroll');
        recipeCard.classList.remove('hidden');
        recipeCard.classList.add('recipe-grid');
        recipeCardbg.classList.remove('hidden');

        let recipeName = document.createElement('h4');
        recipeName.setAttribute('class', 'rendered-title');
        recipeCard.append(recipeName);
        recipeName.innerHTML = `${tempRecipe.name}`

        let icon = document.createElement('img');
        icon.setAttribute('class', 'icon');
        icon.src = glasswareIcons[tempRecipe.glassware];
        icon.alt = tempRecipe.glassware;
        recipeCard.append(icon);

        let ingrs = document.createElement('ul');
        ingrs.setAttribute('class', 'ingredients-list');
        recipeCard.append(ingrs);

        for (let i = 0; i < tempRecipe.ingr.length; i += 1) {
            let oneIng = document.createElement('li');
            ingrs.append(oneIng);
            oneIng.innerHTML = `${tempRecipe.amount[i]} - ${tempRecipe.ingr[i]}`
        }

        let howToMake = document.createElement('p');
        howToMake.setAttribute('class', 'how-make');
        recipeCard.append(howToMake);
        howToMake.innerHTML = `How to make: ${tempRecipe.instructions}`

        let notes = document.createElement('p');
        notes.setAttribute('class', 'notes');
        recipeCard.append(notes);
        notes.innerHTML = `Notes: ${tempRecipe.notes}`

        let cancel = document.createElement('button');
        cancel.setAttribute('class', 'close-popup');
        cancel.innerHTML = '&#x2715'
        cancel.addEventListener('click', function () {
            recipeCard.innerHTML = '';
            recipeCard.classList.remove('recipe-grid');
            recipeCard.classList.add('hidden');
            recipeCardbg.classList.add('hidden');
            antiScroll.classList.remove('no-scroll');
        })
        recipeCard.append(cancel);
    }
}