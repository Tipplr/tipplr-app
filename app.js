'use strict';
// console.log('linked');
let userInventory = []; // array of ingredient objects
let userRecipes = [];
let allTags = []; //holds all tags 

let filteredCocktails = [];
let allIngred = [];
let allCocktails = []; //cocktail objects stored alphabetically
let glasswareIcons = []; // holds filepaths for images
// "drink" as shorthand for "Cocktail object instance"

const Cocktail = function(name, base, specs = [], glassware, instructions = "", notes = "") { // user-gen or from API, also template for mock dataset
    this.name = name;
    this.base = base;
    this.specs = specs; //array specs = [[amount, ingredient], [amount, ingredient]]
    this.glassware = glassware;
    this.instructions = instructions;
    this.notes = notes;
    // this.tags = tags;
    this.possible = false; // this prop indicates if drink is compatible with userInventory
    this.almostPossible = false; // same as above, but for those missing one ingredient
}

// Tied to the user-generated recipe feature
Cocktail.prototype.specsBuilder = function () { // Takes user form entry as input, pushes to drink specs
//assemble specs array via loops, perhaps?
this.specs.push(/*output*/);
}

const Ingredient = function (name, type){
    this.name = name;
    this.type = type;
}

// Ingredients as inventory object
// recipe item (Ingred instance with qty/unit values)
    // Specs instance would be constructed of mult. recipe items

//Functions List
//Enter website (age verification)
    //display minimum birth date for 21 years old
    // "were you born before ___ or after?"
//Base website (on load after age check)
   function retriveLocalStorage() {
       //for access to user-entered cocktails in userRecipes[] 
            //combine built-in cocktails with user cocktails into allCocktails []
        // get userInventory[]
        // STRETCH: get allTags[] 
    }       
    function renderFunction(array){
        //render array of allCocktails
    }
    function alphabetFunction(){
        //push cocktail object to allCocktails in alphabetical order
    // add eventlisteners
    }
// Viewing a recipe:
    function eventlistener() {
         //to display recipe "card" 
    }
    function renderRecipeCard() {
        //change from hidden to shown
        //add event listener for nav left, right, return to list
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
    function getlocalstorage() { 
        // happens when user navs to/refreshes inventory page
        //get array of ingredient objects stored in the userInventory array
        //parse JSON
    }
    function renderIngrList() {
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
    function saveToLocalStorage() {
        // saves userInventory to local Storage
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
    }
    function showNewRecipeForm() {
        //changes CSS display styling to properly display the recipe card pop-up form
    }
    function addRecipeHandler(){
        //call showNewRecipeForm()
    }
    function newRecipeFormSubmit(){
        //calls new Cocktail construtor
        //pushes form values into Cocktail constructor
        //STRETCH: call filterFunction() if applicable new recipe will now show in filtered array
        //STRETCH: call renderFiltered() re-renders page so if new recipe meets requirements is now displayed on the page
    }
    function clearForm(){
        //clears all form fields
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
const manhattan = new Cocktail('Manhattan', 'Whiskey', [['2 oz', 'Whiskey'], ['1 oz', 'Sweet Vermouth'], ['2 dashes', 'Angostura Bitters']], 'Up','', );
