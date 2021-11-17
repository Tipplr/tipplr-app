let coll = document.getElementsByClassName('collapsible');
let add = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let i;
// incrementor for new specs id
// starts at 1 because initial field is 0
let newSpecsId = 0;

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

let addFunction = function (event) {
    event.preventDefault()
    const specForm = document.getElementById('inputSpecs');
    const newSpecIngrInput = document.createElement('input');
    const newSpecAmntInput = document.createElement('input');
    // need to update so each new field has a unique id
    newSpecIngrInput.setAttribute('type', 'text');
    newSpecIngrInput.setAttribute('name', 'specs');
    newSpecIngrInput.setAttribute('id', `specs-ingr-${newSpecsId}`);
    newSpecIngrInput.setAttribute('placeholder', 'Ingredient...');
    // console.log('newSpecIngrInput Id: ' + newSpecIngrInput.id);

    newSpecAmntInput.setAttribute('type', 'text');
    newSpecAmntInput.setAttribute('name', 'specs');
    newSpecAmntInput.setAttribute('id', `specs-amnt-${newSpecsId}`);
    newSpecAmntInput.setAttribute('placeholder', 'Amount...');
    // console.log('newSpecAmntInput Id: ' + newSpecAmntInput.id);

    specForm.append(newSpecIngrInput);
    specForm.append(newSpecAmntInput);

    newSpecsId += 1;

}

add.addEventListener('click', addFunction)

let index = 0;
let minusFunction = function (event) {
    event.preventDefault();
    const specForm = document.getElementById('inputSpecs');
    // will throw error if no new spec fields created
    const newSpecIngrInput = document.getElementById(`specs-ingr-${index}`);
    const newSpecQtyInput = document.getElementById(`specs-amnt-${index}`);
    specForm.removeChild(newSpecIngrInput);
    specForm.removeChild(newSpecQtyInput);
    console.log(index);
    index += 1;
    console.log(index);
}

minusBtn.addEventListener('click', minusFunction);

function getNewSpecsCount() {

}

function recipeEventListener() {
    //listens for button click to add a recipe
    const recipeSubmitBtn = document.getElementById('recipeSubmitBtn');
    recipeSubmitBtn.addEventListener('click', addRecipeHandler);
}

// recipeEventListner();

function showNewRecipeForm() {
    //changes CSS display styling to properly display the recipe card pop-up form
    // show pop-up card form
}
function addRecipeHandler(event) {
    //call showNewRecipeForm()
    event.preventDefault();
    newRecipeFormSubmit();
    showNewRecipeForm();
    clearForm();
}

function newRecipeFormSubmit() {
    //calls new Cocktail construtor
    //pushes form values into Cocktail constructor
    // grab field input

    console.log('newSpecsId Count: ' + newSpecsId);

    const name = document.getElementById('recipe-name').value;
    console.log('recipe name Input: ' + name);

    const base = document.getElementById('base').value;
    console.log('base Input: ' + base);

    const glassware = document.getElementById('glassware').value;
    console.log('glassware Input: ' + glassware);

    const instructions = document.getElementById('instruct').value;
    console.log('instructions input: ' + instructions);
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

    // name, base, ingr = [], amount = [], glassware, instructions = "", notes = ""

    const newCocktail = new Cocktail(name, base, ingrArray, amntArray, instructions, notes);

    console.log(newCocktail);

    //STRETCH: call filterFunction() if applicable new recipe will now show in filtered array
    //STRETCH: call renderFiltered() re-renders page so if new recipe meets requirements is now displayed on the page
}
function clearForm() {
    //TODO: add base, ingr, qty, glassware, notes
    //clears all form fields
    const nameField = document.getElementById('recipe-name');
    const specsField = document.getElementById('specs');
    const instructionsField = document.getElementById('instruct');

    // may need refactor
    nameField.value = '';
    specsField.value = '';
    instructionsField.value = '';
}