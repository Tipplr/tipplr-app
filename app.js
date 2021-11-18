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
Ingredient.userInventory = []; // array of user ingredient objects
Ingredient.basic = []; // array of basic ingredients
Ingredient.userPlusBasicIngr = []; //array of basic and user ingredients
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
        return JSON.parse(localStorage.getItem('cocktails'));
    } else if (key === 'ingredients') {
        return JSON.parse(localStorage.getItem('ingredients'));
    }
    // STRETCH: get allTags[] 
}
// function renderThumbnails(array = Cocktail.all) {
//     //render array of allCocktails
//     //render specifically the name and base property of Cocktail object
//     array.forEach((e, index) => {
//         const recipeList = document.getElementById('recipe-list-grid');
//         let renderRecipe = document.createElement('div');

//         recipeList.appendChild(renderRecipe);
//         renderRecipe.setAttribute('class', 'recipe-card');
//         renderRecipe.setAttribute('id', `${index}`);
//         renderRecipe.innerHTML = `${e.name} with a base of ${e.base}`;
//     })
// }
function alphabetize(array) {
    //pass in array of objects and alphabetize that array by name property
    array.sort((a, b) => {
        let stringa = a.name.toLowerCase();
        let stringb = b.name.toLowerCase();

        if (stringa < stringb) {
            return -1;
        }
        if (stringa > stringb) {
            return 1;
        }
        return 0;
    });
}

function loadObjects() {
    let storedCocktails = getLocalStorage('cocktails');
    let cocktail;

    let storedIngredients = getLocalStorage('ingredients');
    let ingredient;

    if (storedCocktails) {
        generateCocktails();
        for (let i = 0; i < storedCocktails.length; i += 1) {
            cocktail = new Cocktail(storedCocktails[i].name, storedCocktails[i].base, storedCocktails[i].ingr, storedCocktails[i].amount, storedCocktails[i].glassware, storedCocktails[i].instructions, storedCocktails[i].notes);

            Cocktail.userRecipes.push(cocktail); //pushes this cocktail back into userRecipes array
        }
    } else {
        generateCocktails();
    }

    if (storedIngredients) {
        Ingredient.all = [];
        Ingredient.basic = [];
        Ingredient.userInventory = [];
        Ingredient.userPlusBasicIngr = [];
        basicIngredients()
        for (let i = 0; i < storedIngredients.length; i += 1) {
            ingredient = new Ingredient(storedIngredients[i].name, storedIngredients[i].type);

            Ingredient.userInventory.push(ingredient);
            Ingredient.userPlusBasicIngr.push(ingredient);
        }
    } else {
        basicIngredients();
    }

    alphabetize(Cocktail.all);
    alphabetize(Ingredient.userInventory);
}
// User story #1: ability to filter the provided cocktail recipe list to view only the recipes possible with current inventory
// eventlistener on button click


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
function clearChildren(id) {
    const parentElem = document.getElementById(id);
    parentElem.replaceChildren();
}
function saveAndRenderInv() {
    //call saveToLocalStorage()
    //call clearTable()
    //call renderIngrList()
}


//User story #3 enter and store my own recipe

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


// Call vvv
// let almostPossible = filterDrinks(1); //argument of tolerance = 1. Uses userInventory, allCocktails. Outputs array to almostPossible
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
    let builtInRecipeData = [
        // ["name", "base", ingr[], amt[], "glass", "instr", "notes"],
        // TEMPLATE to add more:
        // ["", "", [], [], "", "", ""],

        ["Manhattan", 'Whiskey', ['Whiskey', 'Sweet Vermouth', 'Angostura Bitters'],
            ['2 oz', '1 oz', '2 dashes'], 'Up'
        ],
        ["Bee's Knees", 'Gin', ['Gin', 'Lemon', 'Honey Syrup'],
            ['2 oz', '3/4 oz', '3/4 oz'], 'Up'
        ],
        ["Gimlet", 'Gin', ['Gin', 'Lime', 'Simple Syrup'],
            ['2 oz', '3/4 oz', '1/2 oz'], 'Up'
        ],
        ["Mojito", 'Rum', ['Rum', 'Lime', 'Simple Syrup'],
            ['2 oz', '3/4 oz', '1/2 oz'], 'Collins'
        ],
        ["Rosita", 'Tequila', ['Tequila', 'Sweet Vermouth', 'Dry Vermouth', 'Campari'],
            ['1 3/4 oz', '1/2 oz', '1/2 oz', '1/2 oz'], 'Rocks'
        ],
        ["Moscow Mule", 'Vodka', ['Vodka', 'Lime', 'Ginger Beer '],
            ['1 1/2 oz', '1/2 oz', 'Top'], 'Mule Mug'
        ],
        ["Cosmopolitan", "Vodka", ["Vodka", "Triple Sec", "Lime", "Cranberry"],
            [2, .75, .75, .5], "Coupe", "Shake and strain --> chilled glass, lime twist", ""
        ],
        ["Corpse Reviver #2", "Gin", ["Gin", "Cocchi Americano", "Triple Sec", "Lemon", "Absinthe"],
            [.75, .75, .75, .75, "rinse"], "Coupe", "Shake and strain --> chilled glass, no garnish", ""
        ],
        ["Gold Rush", "Whiskey", ["Bourbon", "Lemon", "Honey Syrup"],
            [2, .75, .75], "Rocks", "Short shake and strain--> Rocks glass with ice, lemon wheel", ""
        ],
        ["French 75", "Gin", ["Gin", "Lemon", "Simple Syrup", "Sparkling Wine"],
            [1, .5, .5, "top"], "Flute", "Shake and strain into flute, top with sparkling wine. Spiral-cut lemon twist", ""
        ],
        ["Little Italy", "Whiskey", ["Rye", "Cynar", "Sweet Vermouth"],
            [2, .5, .75], "Nick & Nora", "Stir, strain--> chilled glass, cherry", ""
        ],
        ["Mai Tai", "Rum", ["Rum", "Lime", "Triple Sec", "Orgeat", "Demerara Syrup"],
            [1.75, 1, .5, .25, .25], "Rocks", "Whip shake with one cube, dump into rocks glass and top with crushed or pellet ice. Garnish with mint bouquet, a drizzle of dark rum, and grated nutmeg", ""
        ],
        ["Sidecar", "Brandy", ["Cognac", "Dry Curacao", "Lemon", "Demerara Syrup"],
            [2, .75, .75, "1 barspoon"], "Coupe", "Shake, dbl strain--> Chilled coupe with sugar rim", "TIP: rim half the glass to make it optional"
        ],
    ]

    builtInRecipeData.forEach(drink => new Cocktail(...drink));
}


function basicIngredients() {
    let basic;
    let basicArray = [
        ["Rittenhouse Rye", "Whiskey"],//TEST remove before deploy
        ["Roku", "Gin"],//TEST remove before deploy
        ["Bacardi", "Rum"],//TEST remove before deploy
        ["Sweet Vermouth", "Vermouth"],//TEST remove before deploy
        ["Dry Vermouth", "Vermouth"],//TEST remove before deploy
        ["Campari", "Liqueur"],//TEST remove before deploy
        ["Angostura Bitters", "Bitters"],//TEST remove before deploy
        ["Simple Syrup", "Basics"],
        ["Lime", "Basics"],
        ["Lemon", "Basics"]
    ];
    for (let i = 0; i < basicArray.length; i += 1) {
        basic = new Ingredient(basicArray[i][0], basicArray[i][1]);
        Ingredient.basic.push(basic);
        Ingredient.userPlusBasicIngr.push(basic);
    }
}

loadObjects();

//const negroni = new Cocktail("Negroni", 'Gin', ['Gin', 'Campari', 'Sweet Vermouth'], ['1 oz', '1 oz', '1 oz'], 'Rocks');
// User story #5 which ingredient would most broaden the drinks possible 

function mvb() {
    // console.log(Cocktail.all);
    let tempArray = [];
    let numberArray = [];
    let finalArray = [];
    // console.log(Ingredient.userPlusBasicIngr);
    // look through Cocktail.all and find similar NEEDS for drinks
    // compare the most needed item to the users inventory
    // this will need to be tucked in a while loop to not stop until it finds something the user is missing
    console.log(Cocktail.all);
    Cocktail.all.forEach(e => {
        e.ingr.forEach(i => {
            tempArray.push(i);
        })
    })

    console.log(tempArray);
    tempArray.forEach(i => {
        let tempValueOfI = 0;
        numberArray.push(tempValueOfI);
    })

    tempArray.forEach(ingredient => {
        let tempIngr = ingredient
        tempArray.forEach((i, index) => {
            if (tempArray[index] === tempIngr) {
                numberArray[index] += 1;
            }
        })
    })
    // console.log(numberArray);
    tempArray.forEach((e, index) => {
        finalArray.push([`${numberArray[index]}`, `${tempArray[index]}`])
    })

    finalArray.sort(function (a, b) {
        // console.log(a[0]);
        return b[0] - a[0];
    });

    let newArray = new Set(finalArray.map(JSON.stringify));
    let newerArray = Array.from(newArray).map(JSON.parse);

    console.log(newerArray);
    // finalArray.forEach(array => {
    //     let placeHolderArray = array;
    //     console.log(placeHolderArray);
    //     finalArray.forEach((i, index) => {
    //         // if (finalArray[index] === placeHolderArray) {
    //         //     finalArray.pop(finalArray[index]);
    //         // }
    //     })
    // })
    // tempArray.forEach((i, index) => {
    //     // console.log(i);
    //     if (tempArray.includes(i)) {
    //         finalArray[index] += 1;
    //     }
    // })
}
mvb();