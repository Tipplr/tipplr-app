const recipeListEventListener = document.getElementById('recipe-list-grid');
recipeListEventListener.addEventListener('click', renderRecipeCard);

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

renderThumbnails();

function renderRecipeCard(event) {
    //change from hidden to shown
    //add event listener for nav left, right, return to list
    let clicked = event.target.id;

    let recipeCard = document.getElementById('popup');
    let recipeCardbg = document.getElementById('popup-outline');
    let antiScroll = document.getElementById('body');

    let tempRecipe = Cocktail.all[clicked];

    if (tempRecipe) {

        antiScroll.classList.add('no-scroll');
        recipeCard.classList.remove('hidden');
        recipeCard.classList.add('recipe-grid');
        recipeCardbg.classList.remove('hidden');

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
            antiScroll.classList.remove('no-scroll');
        })
        recipeCard.append(cancel);
    }
}
const filterButtons = document.getElementById('filter-buttons');
filterButtons.addEventListener('click', filterHandler);
//filters property of base spirt clicked as milestone to story #1
function filterHandler(event) {
    switch (event.target.id) {
        case "filter-01":
            filterDrinksPossible(0);
            break;
        case "filter-02":
            filterDrinksBySpirit('gin');
            break;
        case "filter-03":
            filterDrinksBySpirit('whiskey');
            break;
        case "filter-04":
            filterDrinksBySpirit('tequila');
            break;
        case "filter-05":
            filterDrinksBySpirit('rum');
            break;
        case "filter-06":
            filterDrinksBySpirit('vodka');
            break;
        case "filter-07":
            filterDrinksBySpirit('brandy');
            break;
        case "filter-08":
            filterDrinksPossible(1);
            break;
        case "filter-09":
            filterDrinksBySpirit('other');
            break;
    }
    console.log("clicked on: ", event.target.id);
}
//mock data for testing function:
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
        name: "Lemon",
        type: "basics"
    }
];

function filterDrinksPossible(tolerance, array = Cocktail.all) {
    // tolerance of 0 if currently possible, tolerance of 1 for one-ingredient-away
    Cocktail.filtered = []; // STRETCH: Change the logic so mult. filters causes multiple passes of array through this function. Allow deselection or clearing of filters.
    let inventoryNames = Ingredient.userInventory.map(element => element.name.toLowerCase());
    let inventoryTypes = Ingredient.userInventory.map(element => element.type.toLowerCase());
    array.forEach(cocktail => { // iterate through array of cocktail instances
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
    console.log(Cocktail.filtered);
    return Cocktail.filtered;
}

function filterDrinksBySpirit(base, array = Cocktail.all) {
    Cocktail.filtered = [];
    Cocktail.all.forEach(cocktail => {
        if (cocktail.base.toLowerCase() === base) {
            Cocktail.filtered.push(cocktail);
        }
    });
    console.log(Cocktail.filtered);
    return Cocktail.filtered;
}

function renderFiltered() {
    //update the displayed cocktails
}


function searchBar() { // STRETCH
    //updates displayFiltered based on cocktail name entered (returns 1 cocktail or more if smart)
    //call renderFiltered()
}



