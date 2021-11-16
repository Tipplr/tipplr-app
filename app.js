'use strict';
let allTags = []; //holds all tags 
let glasswareIcons = []; // holds filepaths for images
// "drink" as shorthand for "Cocktail object instance"

const Cocktail = function(name, base, ingr = [], amount = [], glassware, instructions = "", notes = "") { // user-gen or from API, also template for mock dataset
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

const Ingredient = function (name, type){
    this.name = name;
    this.type = type;

    Ingredient.all.push(this);
}

Ingredient.all = [];
Ingredient.userInventory = []; // array of ingredient objects

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
        if (key === 'cocktails'){
            console.log('you entered key: cocktails');
           return JSON.parse(localStorage.getItem('cocktails'));
        } else if (key === 'ingredients'){
            console.log('you entered key: ingredients');
           return JSON.parse(localStorage.getItem('ingredients'));
        }
        // STRETCH: get allTags[] 
    }       
    function renderThumbnails(array){
        //render array of allCocktails
        //render specifically the name and base property of Cocktail object
        array.forEach((e, index) => {
            const recipeList = document.getElementById('recipe-list-grid');
            let renderRecipe = document.createElement('div');

            recipeList.appendChild(renderRecipe);
            renderRecipe.setAttribute('class', 'recipe-card');
            renderRecipe.setAttribute('id', `${index}`);
            renderRecipe.innerHTML = `${e.name} with a base of ${e.base}`;

            console.log(e.ingr);
            console.log(e.amount);
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
// Viewing a recipe:
function eventlistener() {
    //to display recipe "card" 
}
function renderRecipeCard(array) {
    //change from hidden to shown
    //add event listener for nav left, right, return to list
    array.forEach((e, index) => {
        let recipeCard = document.getElementById(`${index}`)

        let writeRecipe = document.createElement('div');
        writeRecipe.setAttribute('class', 'popup-recipe');
        recipeCard.append(writeRecipe);

        let icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        writeRecipe.append(icon);

        let recipeName = document.createElement('h4');
        recipeName.setAttribute('class', 'rendered-title');
        writeRecipe.append(recipeName);
        recipeName.innerHTML = `${e.name}`


        let ingrs = document.createElement('ul');
        writeRecipe.append(ingrs);
        let oneIng = document.createElement('li');
        ingrs.append(oneIng);
        for (let i = 0; i < e.ingr.length; i += 1) {
            let oneIng = document.createElement('li');
            ingrs.append(oneIng);
            oneIng.innerHTML = `${e.ingr[i]} - ${e.amount[i]}`
        }
        let howToMake = document.createElement('p');
        writeRecipe.append(howToMake);
        howToMake.innerHTML = `How to make: ${e.instructions}`

        let notes = document.createElement('p');
        writeRecipe.append(notes);

        notes.innerHTML = `Notes: ${e.notes}`
    })
}


// User story #1: ability to filter the provided cocktail recipe list to view only the recipes possible with current inventory

    // eventlistener on button click
    //    filters property of base spirt clicked as milestone to story #1
    function filterDrinksPossible(tolerance) {  
        // tolerance of 0 if currently possible, tolerance of 1 for one-ingredient-away
        // filter based on userInventory (see story #5)
        //outputs filtered array of Cocktails filteredCocktails []
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

        if (objectName === 'Cocktail'){
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
    function recipeEventListner(){
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
    function cancelButton(){
        //calls clearForm()
        //changes CSS display styling back so pop-up form is hidden  
    } 
//User story #4 save drinks my friends like, and filter by them
    //within the recipe card...
   function tagEventListener() {
        //listens for event
    }
    function displayField(){
        //displays friend field and 'add' button
    }
    function addTagButton() {
        //pushes friend name to this.tags array
        //save allTags to local storage
    }
        
// User story #5 which ingredient would most broaden the drinks possible 
    // Call vvv
    let almostPossible = filterDrinksPossible(1); //argument of tolerance = 1. Uses userInventory, allCocktails. Outputs array to almostPossible
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
function generateCocktails(){
    const manhattan = new Cocktail("Manhattan", 'Whiskey', ['Whiskey', 'Sweet Vermouth', 'Angostura Bitters'], ['2 oz', '1 oz', '2 dashes'], 'Up');
    const beesKnees = new Cocktail("Bee's Knees", 'Gin', ['Gin','Lemon', 'Honey Syrup'],['2 oz', '3/4 oz', '3/4 oz'], 'Up');
    const gimlet = new Cocktail("Gimlet", 'Gin', ['Gin', 'Lime', 'Simple Syrup'],['2 oz', '3/4 oz', '1/2 oz'], 'Up');
    const mojito = new Cocktail("Mojito", 'Rum', ['Rum', 'Lime', 'Simple Syrup'],['2 oz', '3/4 oz', '1/2 oz'], 'Collins');
    const rosita = new Cocktail("Rosita", 'Tequila', ['Tequila', 'Sweet Vermouth', 'Dry Vermouth', 'Campari'], ['1 3/4 oz', '1/2 oz', '1/2 oz', '1/2 oz'], 'Rocks');
    const moscowMule = new Cocktail("Moscow Mule", 'Vokda', ['Vodka', 'Lime', 'Ginger Beer '], ['1 1/2 oz', '1/2 oz', 'Top'], 'Mule Mug');
}

generateCocktails();

const roku = new Ingredient('Roku', 'Gin');

renderThumbnails(Cocktail.all);
renderRecipeCard(Cocktail.all);
