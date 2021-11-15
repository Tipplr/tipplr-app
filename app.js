'use strict';
let userInventory = []; // array of ingredient objects
let allIngred = [];
let allCocktails = []; //cocktail objects stored alphabetically
let glasswareIcons = []; // holds filepaths for images 
// "drink" as shorthand for "Cocktail object instance"

const Cocktail = function(name, base, specs = [], glassware, instructions = "", notes = "", tags = []) { // user-gen or from API, also template for mock dataset
    this.name = name;
    this.base = base;
    this.specs = specs; //array specs = [[ingredient, amount], [ingredient, amount]]
    this.glassware = glassware;
    this.instructions = instructions;
    this.notes = notes;
    this.tags = tags;
    this.
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
    retriveLocalStorage() //for access to user-entered cocktails 
    //combine built-in cocktails with user cocktails into allCocktails []
    renderFunction(array of cocktails to be rendered)
        //render array of allCocktails
    alphabetFunction()
        //push cocktail object to allCocktails in alphabetical order
    add eventlisteners

Viewing a recipe:
    eventlistener() 
        navigate
    renderRecipeCard()
        //change from hidden to shown
        add event listener for nav left, right, return to list


User story #1: ability to filter the provided cocktail recipe list to view only the recipes possible with current inventory

    eventlistener on button click
    filterfunction()
        filters on tag of base spirt clicked as milestone to story #1
        filter on tag of userInventory
        //outputs filtered array of Cocktails filteredCocktails []
    renderFiltered()
        update the displayed cocktails
    

    
    
        searchbar
        // cocktail by name
*/