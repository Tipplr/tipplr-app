'use strict';
let allTags = []; //holds all tags 
let glasswareIcons = []; // holds filepaths for images
// "drink" as shorthand for "Cocktail object instance"

const Cocktail = function (name, base, ingr = [], amount = [], glassware, instructions = "", notes = "") { // user-gen or from API, also template for mock dataset
    this.name = name;
    this.base = base;
    this.ingr = ingr;
    this.amount = amount;
    this.specs = []; //array specs = [[amount + ingredient], [amount + ingredient]]
    this.glassware = glassware;
    this.instructions = instructions;
    this.notes = notes;
    // this.tags = tags;
    this.possible = false; // this prop indicates if drink is compatible with userInventory
    this.almostPossible = false; // same as above, but for those missing one ingredient

    Cocktail.all.push(this);
}

Cocktail.all = []; //cocktail objects stored alphabetically
Cocktail.userRecipes = [];
Cocktail.filtered = [];

// Tied to the user-generated recipe feature
Cocktail.prototype.specsBuilder = function () { // Takes user form entry as input, pushes to drink specs
    //assemble specs array via loops, perhaps?
    this.specs.push(/*output*/);
}

const Ingredient = function (name, type) {
    this.name = name;
    this.type = type;

    Ingredient.all.push(this);
}

Ingredient.all = [];
Ingredient.userInventory = []; // array of ingredient objects
Ingredient.missingIngredients = [];

// Ingredients as inventory object
// recipe item (Ingred instance with qty/unit values)
// Specs instance would be constructed of mult. recipe items

//Functions List
//Enter website (age verification)
//display minimum birth date for 21 years old
// "were you born before ___ or after?"
//Base website (on load after age check)
function getLocalStorage(key) {
    //for access to user-entered cocktails in userRecipes[]
    //combine built-in cocktails with user cocktails into allCocktails []
    // get userInventory[]
    if (key === 'cocktails') {
        console.log('you entered key: cocktails');
        return JSON.parse(localStorage.getItem('cocktails'));
    } else if (key === 'ingredients') {
        console.log('you entered key: ingredients');
        return JSON.parse(localStorage.getItem('ingredients'));
    }
    // STRETCH: get allTags[] 
}
function renderThumbnails(array = Cocktail.all) {
    //render array of allCocktails
    //render specifically the name and base property of Cocktail object
    array.forEach((e, index) => {
        const recipeList = document.getElementById('recipe-list-grid');
        let renderRecipe = document.createElement('div');

        recipeList.appendChild(renderRecipe);
        renderRecipe.setAttribute('class', 'recipe-card');
        renderRecipe.setAttribute('id', `${index}`);
        renderRecipe.innerHTML = `${e.name} with a base of ${e.base}`;
    })
}
function alphabetize(array) {
    //pass in array of objects and alphabetize that array by name property
    array.sort((a, b) => {
        let stringa = a.name.toLowerCase();
        let stringb = b.name.toLowerCase();

        if (stringa < stringb){
            return -1;
        }
        if (stringa > stringb){
            return 1;
        }
        return 0;
    });
}

function loadRecipes(){
    let storedUserRecipes = getLocalStorage('cocktails');
    let cocktail;
    if (storedUserRecipes){
        generateCocktails();
        for(let i = 0; i < storedUserRecipes.length; i += 1){
           cocktail = new Cocktail (`${storedUserRecipes[i].name}`,`${storedUserRecipes[i].base}`, [], [], `${storedUserRecipes[i].glassware}`, `${storedUserRecipes[i].instructions}`, `${storedUserRecipes[i].notes}`);
           //template literal of array outputs a string...
           cocktail.ingr = storedUserRecipes[i].ingr;
           cocktail.amount = storedUserRecipes[i].amount;
        
           Cocktail.userRecipes.push(cocktail); //pushes this cocktail back into userRecipes array
        }
    } else {
        generateCocktails();
        console.log ('no user recipes');
    }
    alphabetize(Cocktail.all);

}
// Viewing a recipe:
const recipeListEventListener = document.getElementById('recipe-list-grid');
recipeListEventListener.addEventListener('click', renderRecipeCard);

function eventlistener() {
    //to display recipe "card" 
}
function renderRecipeCard(event) {
    //change from hidden to shown
    //add event listener for nav left, right, return to list
    let clicked = event.target.id;

    let recipeCard = document.getElementById('popup');
    let recipeCardbg = document.getElementById('popup-outline');

    let tempRecipe = Cocktail.all[clicked];

    if (tempRecipe) {

        recipeCard.classList.remove('hidden');
        recipeCard.classList.add('recipe-grid');
        recipeCardbg.classList.remove('hidden');
        // let writeRecipe = document.createElement('div');
        // recipeCard.append(writeRecipe);

        let recipeName = document.createElement('h4');
        recipeName.setAttribute('class', 'rendered-title');
        recipeCard.append(recipeName);
        recipeName.innerHTML = `${tempRecipe.name}`

        let icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        recipeCard.append(icon);

        let ingrs = document.createElement('ul');
        ingrs.setAttribute('class', 'ingredients-list');
        recipeCard.append(ingrs);

        for (let i = 0; i < tempRecipe.ingr.length; i += 1) {
            let oneIng = document.createElement('li');
            ingrs.append(oneIng);
            oneIng.innerHTML = `${tempRecipe.ingr[i]} - ${tempRecipe.amount[i]}`
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
        cancel.innerHTML = 'X'
        cancel.addEventListener('click', function () {
            recipeCard.innerHTML = '';
            recipeCard.classList.remove('recipe-grid');
            recipeCard.classList.add('hidden');
            recipeCardbg.classList.add('hidden');
        })
        recipeCard.append(cancel);
    }
}


// User story #1: ability to filter the provided cocktail recipe list to view only the recipes possible with current inventory
// eventlistener on button click
//filters property of base spirt clicked as milestone to story #1

//mock data for testing function:

  /*
  Ingredient.userInventory = [{
          name: "Rittenhouse Rye",
          type: "whiskey",
      },
      {
          name: "Roku",
          type: "gin",
      },
      {
          name: "Lime",
          type: "basics",
      },
      {
          name: "Simple syrup",
          type: "basics",
      },
      {
          name: "Sweet vermouth",
          type: "vermouth",
      },
      {
          name: "Campari",
          type: "liqueur",
      },
      {
          name: "Angostura Bitters",
          type: "bitters",
      },
      {
          name: "Rum",
          type: "rum",
      },
      {
          name: "Dry Vermouth",
          type: "dry vermouth"
      },
      {
          name: "Tequila",
          type: "tequila"
      }
  ];
*/
function filterDrinksPossible(tolerance) {
    // tolerance of 0 if currently possible, tolerance of 1 for one-ingredient-away
    let inventoryNames = Ingredient.userInventory.map(element => element.name.toLowerCase());
    let inventoryTypes = Ingredient.userInventory.map(element => element.type.toLowerCase());
    Cocktail.all.forEach(cocktail => { // iterate through array of cocktail instances
                let ingredients = cocktail.ingr.slice(); // Copies this ingr array for safe handling
                let deltas = 0;

ingredients.forEach(ingredient => { // for ingredients in this recipe
            ingredient = ingredient.toLowerCase();
            let typeMatch = inventoryTypes.some(type => ingredient === type); // Boolean 
            let nameMatch = inventoryNames.some(name => ingredient === name); // Boolean

if (!typeMatch && !nameMatch) { // if this ingredient is NOT found in the inventory names or types
    deltas++;
    Ingredient.missingIngredients.push(ingredient); // ADDS TO ARRAY OF INGREDIENTS USER DOESN'T HAVE
}
});
// done comparing each drink ingredient against inventory
if (deltas === 0) { // delta/tolerance possibilities: [ 0/0, 0/1, 0/2, 1/0/, 1/1, 1,2, 2/0, 2/1, 2/2]
    cocktail.possible = true;
    if (tolerance === 0) Cocktail.filtered.push(cocktail);
} else if (deltas === tolerance) {
    cocktail.almostPossible = true;
    Cocktail.filtered.push(cocktail);
}
});
return Cocktail.filtered;
}

function renderFiltered() {
    //update the displayed cocktails
}


function searchBar() { // STRETCH
    //updates displayFiltered based on cocktail name entered (returns 1 cocktail or more if smart)
    //call renderFiltered()
}


//User story #2 input ingredients I own, and have the website track it

// happens when user navs to/refreshes inventory page
//get array of ingredient objects stored in the userInventory array
//parse JSON

function renderIngrList() {
    //call getLocalStorage('ingredients')
    //write to DOM a table of ingredients and type from userInventory
}
function changeInventoryEventListener() {
    //add an event listener to the add new + button and to the - button next to each ingredient in list
}
function inventoryHandler() {
    //if + button is clicked, call showForm()
    //if - button is clicked call removeIngredient()
    //this should alert the user to confirm
}
function showForm() {
    //makes form fields visible to the user on the inventory page
    //name, type 
    //submit
}
function addIngredient() {
    //function called on form submit
    //pushes ingredient into userInventory array
    //call saveAndRenderInv()
}
function removeIngredient() {
    //remove clicked ingredient from the userInventory array
    //saveAndRenderInv() 
}
function saveToLocalStorage(object) {
    // DONE saves userInventory to local Storage
    //checks if the ingredient being uploaded is a Cocktail object or an Ingredient Object
    const objectName = object[0].constructor.name

    if (objectName === 'Cocktail') {
        localStorage.setItem('cocktails', JSON.stringify(object));
    } else {
        localStorage.setItem('ingredients', JSON.stringify(object));
    }
}
function clearTable() {
    //erases rows in table
}
function saveAndRenderInv() {
    //call saveToLocalStorage()
    //call clearTable()
    //call renderIngrList()
}


//User story #3 enter and store my own recipe
function recipeEventListener() {
    //listens for button click to add a recipe
    const recipeSubmitBtn = document.getElementById('recipeSubmitBtn');
    recipeSubmitBtn.addEventListener('click', addRecipeHandler);
}

// recipeEventListener();

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

    function newRecipeFormSubmit(){
        //calls new Cocktail construtor
        //pushes form values into Cocktail constructor
        // grab field input
        const name = document.getElementById('recipe-name').value; // change to camelCase
        console.log('reciepName Input: ' + name);

        const specs = document.getElementById('specs').value;
        console.log('specs Input: ' + specs);
        const instructions = document.getElementById('instruct').value;
        console.log('instructions input: ' + instructions);

        const newCocktail = new Cocktail(name, instructions);

        console.log(newCocktail);

        //STRETCH: call filterFunction() if applicable new recipe will now show in filtered array
        //STRETCH: call renderFiltered() re-renders page so if new recipe meets requirements is now displayed on the page
    }
    function clearForm(){
        //clears all form fields
        const nameField = document.getElementById('recipe-name');
        const specsField = document.getElementById('specs');
        const instructionsField = document.getElementById('instruct');

        // may need refactor
        nameField.value = '';
        specsField.value = '';
        instructionsField.value = '';
    }

//User story #4 save drinks my friends like, and filter by them
//within the recipe card...
function tagEventListener() {
    //listens for event
}
function displayField() {
    //displays friend field and 'add' button
}
function addTagButton() {
    //pushes friend name to this.tags array
    //save allTags to local storage
}

// User story #5 which ingredient would most broaden the drinks possible 

    // Call vvv
    // let almostPossible = filterDrinksPossible(1); //argument of tolerance = 1. Uses userInventory, allCocktails. Outputs array to almostPossible
            // (# userInventory IN this.specs) === specs.length-1) 
            // an array of cocktails for which all ingredients except one can be found in userInventory[]
            // this COULD be the same function as the filter for "is possible", with an argument of 1 passed as the "tolerance". When the function gets used for "is possible", we would pass an argument of 0. 
    // get highYieldBottle and corresponding newBottleRecipes[]    
        // from almostPossible[] or at the same time, create array of one-off missing ingredients
        // .reduce() oneOff[] to get total additional cocktails possible per missing ingredient
        // .sort() to get highYieldBottle, the highest number of new possible drinks 
        // use highYieldBottle to .filter() through specs in almostPossible[] to produce newBottleRecipes[]
    // render highYieldBottle and highYieldRecipes[]
    
        

// User story #6 quick access to the app’s cocktail recipes and search feature with minimal clicks/prompts
// primarily HTML/CSS driven
// User story #7 alert notifying me that site users must be at least 21 years old
//this is accomplished at the page load

// const Cocktail = function(name, base, specs = [], glassware, instructions = "", notes = "", tags = [], possible, almostPossible)    
function generateCocktails() {
    const manhattan = new Cocktail("Manhattan", 'Whiskey', ['Whiskey', 'Sweet Vermouth', 'Angostura Bitters'], ['2 oz', '1 oz', '2 dashes'], 'Up');
    const beesKnees = new Cocktail("Bee's Knees", 'Gin', ['Gin', 'Lemon', 'Honey Syrup', 'Honey', 'Gin', 'Lemon', 'Honey Syrup', 'Honey', 'Gin', 'Lemon', 'Honey Syrup', 'Honey'], ['2 oz', '3/4 oz', '3/4 oz'], 'Up');
    const gimlet = new Cocktail("Gimlet", 'Gin', ['Gin', 'Lime', 'Simple Syrup'], ['2 oz', '3/4 oz', '1/2 oz'], 'Up');
    const mojito = new Cocktail("Mojito", 'Rum', ['Rum', 'Lime', 'Simple Syrup'], ['2 oz', '3/4 oz', '1/2 oz'], 'Collins');
    const rosita = new Cocktail("Rosita", 'Tequila', ['Tequila', 'Sweet Vermouth', 'Dry Vermouth', 'Campari'], ['1 3/4 oz', '1/2 oz', '1/2 oz', '1/2 oz'], 'Rocks');
    const moscowMule = new Cocktail("Moscow Mule", 'Vokda', ['Vodka', 'Lime', 'Ginger Beer '], ['1 1/2 oz', '1/2 oz', 'Top'], 'Mule Mug');
}

loadRecipes();

const roku = new Ingredient('Roku', 'Gin');

renderThumbnails();
// TODO: package into function for index.html pageload event

//const negroni = new Cocktail("Negroni", 'Gin', ['Gin', 'Campari', 'Sweet Vermouth'], ['1 oz', '1 oz', '1 oz'], 'Rocks');