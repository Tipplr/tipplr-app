'use strict';
let userInventory = []; // array of ingredient objects
let userRecipes = [];
let allTags = []; //holds all tags 

let allIngred = [];
let allCocktails = []; //cocktail objects stored alphabetically
let glasswareIcons = []; // holds filepaths for images
// "drink" as shorthand for "Cocktail object instance"

const Cocktail = function(name, base, specs = [], glassware, instructions = "", notes = "", tags = [], possible, almostPossible) { // user-gen or from API, also template for mock dataset
    this.name = name;
    this.base = base;
    this.specs = specs; //array specs = [[ingredient, amount], [ingredient, amount]]
    this.glassware = glassware;
    this.instructions = instructions;
    this.notes = notes;
    this.tags = tags;
    this.possible = possible; // this prop indicates if drink is compatible with userInventory
    this.almostPossible = almostPossible; // same as above, but for those missing one ingredient
}

// Tied to the user-generated recipe feature
Cocktail.prototype.specsBuilder = function (...) { // Takes user form entry as input, pushes to drink specs
//assemble specs array via loops, perhaps?
this.specs.push(/*output*/);
}

const Ingredient = function (name, type, qty, unit){
    this.name = name;
    this.type = type;
    this.qty = qty;
    this.unit = unit;
}

// Ingredients as inventory object
// recipe item (Ingred instance with qty/unit values)
    // Specs instance would be constructed of mult. recipe items

/* Functions List
Enter website (age verification)
    //display minimum birth date for 21 years old
    // "were you born before ___ or after?"
Base website (on load after age check)
    retriveLocalStorage() 
        //for access to user-entered cocktails in userRecipes[] 
            //combine built-in cocktails with user cocktails into allCocktails []
        // get userInventory[]
        // STRETCH: get allTags[]    
    renderFunction(array of cocktails to be rendered)
        //render array of allCocktails
    alphabetFunction()
        //push cocktail object to allCocktails in alphabetical order
    add eventlisteners

Viewing a recipe:
    eventlistener() to display recipe "card" 
        
    renderRecipeCard()
        //change from hidden to shown
        add event listener for nav left, right, return to list


User story #1: ability to filter the provided cocktail recipe list to view only the recipes possible with current inventory

    eventlistener on button click
    filterfunction()
        filters property of base spirt clicked as milestone to story #1
        filter based on userInventory (see story #5)
        //outputs filtered array of Cocktails filteredCocktails []
    renderFiltered()
        update the displayed cocktails
    
    searchBar() // STRETCH
        //updates displayFiltered based on cocktail name entered (returns 1 cocktail or more if smart)
        //call renderFiltered()
        
User story #2 input ingredients I own, and have the website track it
    getlocalstorage() // happens when user navs to/refreshes inventory page
        //get array of ingredient objects stored in the userInventory array
        //parse JSON
    renderIngrList()
        //write to DOM a table of ingredients and type from userInventory
    changeInventoryEventListener()
        //add an event listener to the add new + button and to the - button next to each ingredient in list
    inventoryHandler()
        //if + button is clicked, call showForm()
        //if - button is clicked call removeIngredient()
            //this should alert the user to confirm
    showForm()
        //makes form fields visible to the user on the inventory page
        //name, type 
        //submit
    addIngredient()
        //function called on form submit
        //pushes ingredient into userInventory array
        //call saveAndRenderInv()
    removeIngredient()
        //remove clicked ingredient from the userInventory array
        //saveAndRenderInv() 
 
    saveToLocalStorage()
        // saves userInventory to local Storage
    clearTable()
        //erases rows in table
    saveAndRenderInv()
        //call saveToLocalStorage()
        //call clearTable()
        //call renderIngrList()


User story #3 enter and store my own recipe
    addRecipeEventListner()
        //listens for button click to add a recipe
    showNewRecipeForm()
        //changes CSS display styling to properly display the recipe card pop-up form
    addRecipeHandler()
        //call showNewRecipeForm()
    newRecipeFormSubmit()
        //calls new Cocktail construtor
        //pushes form values into Cocktail constructor
        //STRETCH: call filterFunction() if applicable new recipe will now show in filtered array
        //STRETCH: call renderFiltered() re-renders page so if new recipe meets requirements is now displayed on the page
    clearForm()
        //clears all form fields
    cancelButton()
        //calls clearForm()
        //changes CSS display styling back so pop-up form is hidden  
        
User story #4 save drinks my friends like, and filter by them
    //within the recipe card...
    tagEventListener()
        //listens for event
    displayField()
        //displays friend field and 'add' button
    addTagButton()
        //pushes friend name to this.tags array
        //save allTags to local storage
        
User story #5 which ingredient would most broaden the drinks possible 
    filter( (# userInventory IN this.specs) === specs.length-1) 
        // creates almostPossible[] 
            // an array of cocktails for which all ingredients except one can be found in userInventory[]
            // this COULD be the same function as the filter for "is possible", with an argument of 1 passed as the "tolerance". When the function gets used for "is possible", we would pass an argument of 0. 
    get highYieldBottle and corresponding newBottleRecipes[]    
        // from almostPossible[] or at the same time, create array of one-off missing ingredients
        // .reduce() oneOff[] to get total additional cocktails possible per missing ingredient
        // .sort() to get highYieldBottle, the highest number of new possible drinks 
        // use highYieldBottle to .filter() through specs in almostPossible[] to produce newBottleRecipes[]
    render highYieldBottle and highYieldRecipes[]
    
        
User story #6 quick access to the app’s cocktail recipes and search feature with minimal clicks/prompts
    // primarily HTML/CSS driven
User story #7 alert notifying me that site users must be at least 21 years old
    //this is accomplished at the page load

*/

