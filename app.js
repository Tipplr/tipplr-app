'use strict';
let allTags = []; //holds all tags 
const glasswareIcons = {
  collins: "assets/icons/collins.png",
  coupe: "assets/icons/coupe.png",
  dblof: "assets/icons/dbl-of.png",
  flute: "assets/icons/flute.png",
  martini: "assets/icons/martini.png",
  mule: "assets/icons/mule.png",
  nicknora: "assets/icons/nick-nora.png",
  nosing: "assets/icons/nosing.png",
  shot: "assets/icons/shot.png",
  wine: "assets/icons/wine.png",
}; // holds filepaths for images

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
Ingredient.userPlusBasicIngr = []; //array of basic and user ingredients
Ingredient.basic = []; // array of basic ingredients
Ingredient.missingIngredients = [];
Ingredient.removalIndex;

let isOnRecipePage = false;

function getLocalStorage(key) {
    // get userInventory[]
    if (key === 'cocktails') {
        return JSON.parse(localStorage.getItem('cocktails'));
    } else if (key === 'ingredients') {
        return JSON.parse(localStorage.getItem('ingredients'));
    }
}

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
        Cocktail.all = [];
        Cocktail.userRecipes = [];
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


function saveToLocalStorage(objectNameString) {
    //checks if the ingredient being uploaded is a Cocktail object or an Ingredient Object
    // Saves respective object array to local Storage
    
    if (objectNameString === 'Cocktail') {
        localStorage.setItem('cocktails', JSON.stringify(Cocktail.userRecipes));
    } else if (objectNameString === 'Ingredient'){
        localStorage.setItem('ingredients', JSON.stringify(Ingredient.userInventory));
    }
}

function clearChildren(id) {
    const parentElem = document.getElementById(id);
    parentElem.replaceChildren();
}

function generateCocktails() {
    let builtInRecipeData = [
        // ["name", "base", ingr[], amt[], "glass", "instr", "notes"],
        // TEMPLATE to add more:
        // ["", "", [], [], "", "", ""],

        ["Manhattan", 'Whiskey', ['Whiskey', 'Sweet Vermouth', 'Angostura Bitters'],
            ['2 oz', '1 oz', '2 dashes'], 'nicknora', "Stir with plenty of ice for about 30 seconds, strain--> chilled glass, cherry", ""
        ],
        ["Bee's Knees", 'Gin', ['Gin', 'Lemon', 'Honey Syrup'],
            ['2 oz', '3/4 oz', '3/4 oz'], 'coupe', "Shake hard with plenty of ice for about 15 seconds and strain --> chilled glass, lemon wheel or twist", ""
        ],
        ["Gimlet", 'Gin', ['Gin', 'Lime', 'Simple Syrup'],
            ['2 oz', '3/4 oz', '1/2 oz'], 'nicknora', "Shake hard with plenty of ice for about 15 seconds and strain --> chilled glass, lime wedge", ""
        ],
        ["Mojito", 'Rum', ['Rum', 'Lime', 'Simple Syrup', 'Mint', 'Soda'],
          ['2 oz', '3/4 oz', '1/2 oz', 'handful'], 'collins', "Add all ingredients to shaker except mint leaves and shake hard with several pieces of ice for a few seconds. Add mint leaves to tin and shake again for about 10 seconds in a circular motion to avoid pulverizing the mint. Single strain into collins and fill with crushed ice. Add a splash of soda water, and garnish with a bouquet of mint sprigs.", "TIP: Bruising the mint too much through muddling or shaking releases bitter flavors, which is why this recipe does it a little differently.", ""
        ],
        ["Rosita", 'Tequila', ['Tequila', 'Sweet Vermouth', 'Dry Vermouth', 'Campari'],
            ['1 3/4 oz', '1/2 oz', '1/2 oz', '1/2 oz'], 'dblof', "Build in double-Old Fashioned glass on a big cube (if available). Stir 5-6 times, garnish with a lemon twist", ""
        ],
        ["Moscow Mule", 'Vodka', ['Vodka', 'Lime', 'Ginger Beer '],
            ['1 1/2 oz', '1/2 oz', 'Top'], 'mule', "Build in a mule mug, add ice, and top with about 3 oz ginger beer. Garnish with a fat lime wedge.", "TIP: Change out the base spirit to gin for a London Mule, tequila for a Mexican Mule, bourbon for a Kentucky Mule, etc."
        ],
        ["Cosmopolitan", "Vodka", ["Vodka", "Triple Sec", "Lime", "Cranberry"],
            [2, .75, .75, .5], "martini", "Shake and strain --> chilled glass, lime twist", ""
        ],
        ["Corpse Reviver #2", "Gin", ["Gin", "Cocchi Americano", "Triple Sec", "Lemon", "Absinthe"],
            [.75, .75, .75, .75, "rinse"], "coupe", "Shake and strain --> chilled glass rinsed or sprayed with absinthe, no garnish", ""
        ],
        ["Gold Rush", "Whiskey", ["Bourbon", "Lemon", "Honey Syrup"],
            [2, .75, .75], "dblof", "Short shake and strain--> Rocks glass with ice, lemon wheel", "To make honey syrup: Mix 1 part warm water with 2 parts honey. Keep refrigerated."
        ],
        ["French 75", "Gin", ["Gin", "Lemon", "Simple Syrup", "Sparkling Wine"],
            [1, .5, .5, "top"], "flute", "Shake and strain into flute, top with sparkling wine. Spiral-cut lemon twist", ""
        ],
        ["Little Italy", "Whiskey", ["Rye", "Cynar", "Sweet Vermouth"],
            [2, .5, .75], "nicknora", "Stir with plenty of ice for about 30 seconds, strain--> chilled glass, cherry", ""
        ],
        ["Mai Tai", "Rum", ["Rum", "Lime", "Triple Sec", "Orgeat", "Demerara Syrup"],
            [1.75, 1, .5, .25, .25], "dblof", "Whip shake with one cube, dump into rocks glass and top with crushed or pellet ice. Garnish with mint bouquet, a drizzle of dark rum, and grated nutmeg", ""
        ],
        ["Sidecar", "Brandy", ["Cognac", "Dry Curacao", "Lemon", "Demerara Syrup"],
            [2, .75, .75, "1 barspoon"], "coupe", "Shake, dbl strain--> Chilled coupe with sugar rim", "TIP: rim half the glass to make it optional"
        ],
    ]

    builtInRecipeData.forEach(drink => new Cocktail(...drink));
}

function basicIngredients() {
    let basic;
    let basicArray = [
//         ["Rittenhouse Rye", "Whiskey"],//TEST remove before deploy
//         ["Roku", "Gin"],//TEST remove before deploy
//         ["Bacardi", "Rum"],//TEST remove before deploy
//         ["Sweet Vermouth", "Vermouth"],//TEST remove before deploy
//         ["Dry Vermouth", "Vermouth"],//TEST remove before deploy
//         ["Campari", "Liqueur"],//TEST remove before deploy
//         ["Angostura Bitters", "Bitters"],//TEST remove before deploy
        ["Simple Syrup", "Syrup/Sweetener"],
        ["Simple", "Syrup/Sweetener"],
        ["Demerara Syrup", "Syrup/Sweetener"],
        ["Lime", "Juice"],
        ["Lemon", "Juice"],
        ["Orange", "Juice"],
        ["Cranberry", "Juice"],
        ["Pineapple", "Juice"],
        ["Grapefruit", "Juice"],
        ["Olive Brine", "Juice"]
    ];
    for (let i = 0; i < basicArray.length; i += 1) {
        basic = new Ingredient(basicArray[i][0], basicArray[i][1]);
        Ingredient.basic.push(basic);
        Ingredient.userPlusBasicIngr.push(basic);
    }
}

loadObjects();

function mostValueIngr() {
// determine which ingredient would most broaden the drinks possible


    let tempArray = []; // stores all ingredients for safe handling 
    let numberArray = []; // makes an array of 0's, for each element in tempArray
    let combinedArray = []; // array to hold outputs of tempArray and numberArray

    Cocktail.filtered.forEach(cocktailArray => {
        cocktailArray.ingr.forEach(i => {
            tempArray.push(i.toLowerCase()); // stores ingredients in massive array of all ingredients for all recipes
        })
    })
    tempArray.forEach(singleIngr => {
        let tempValue = 0;
        numberArray.push(tempValue); // generates array of 0's with length equal to tempArray length
    })
    tempArray.forEach(ingredient => {
        let tempIngr = ingredient
        tempArray.forEach((i, index) => {
            if (tempArray[index] === tempIngr) {
                numberArray[index] += 1; // inscreases value based on how many times an ingredient shows up in tempArray
            }
        })
    })
    tempArray.forEach((e, index) => {
        combinedArray.push([`${numberArray[index]}`, `${tempArray[index]}`])
    }) // combines tempArray and numberArray based on indices of both, to assign numbers to ingredients
    // the higher the number, the more often in shows up in current recipes
    let newArray = new Set(combinedArray.map(JSON.stringify));
    let finalArray = Array.from(newArray).map(JSON.parse); // gets rid of duplicates and creates finalArray
    // finalArray will be used to compare to Ingredients.missingIngredients array
    finalArray.sort(function (a, b) {
        return b[0] - a[0];
    });
    // sorts finalArray from most needed ingredient to least needed ingredient, based on numerical value
    let stopper = 0;
    finalArray.forEach(e => {
        if (Ingredient.missingIngredients.includes(e[1]) && stopper === 0) {
            let appendHere = document.getElementById('recipe-list-title');
            let missingAlert = document.createElement('p');
            missingAlert.setAttribute('id', 'ingredient-alert');
            appendHere.appendChild(missingAlert);

            if (e[0] > 1) {
                missingAlert.innerHTML = `Based on your inventory, acquiring ${e[1]} will allow you to make ${e[0]} additional cocktails`
            } else {
                missingAlert.innerHTML = `Based on your inventory, acquiring ${e[1]} will allow you to make ${e[0]} additional cocktail`
            }
            stopper += 1;
        }
    })
}

function removeMostValueIngr() {
    let appendHere = document.getElementById('recipe-list-title');
    let missingAlert = document.getElementById('ingredient-alert');
    if (missingAlert) {
        appendHere.removeChild(missingAlert);
    }
}

function renderThumbnails(array = Cocktail.all) {
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

function renderRecipeCard(event) {
    //change from hidden to shown
    // TODO add event listener for nav left, right, return to list
    let array;

    if (isOnRecipePage === true) {
        array = Cocktail.userRecipes;

    } else if (Cocktail.filtered.length > 0) {
        array = Cocktail.filtered;

    } else {
        array = Cocktail.all;
    }

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
