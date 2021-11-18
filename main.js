const recipeListEventListener = document.getElementById('recipe-list-grid');
recipeListEventListener.addEventListener('click', renderRecipeCard);

const filterButtons = document.getElementById('filter-buttons');
filterButtons.addEventListener('click', filterHandler);

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
renderThumbnails();

function renderRecipeCard(event) {
    //change from hidden to shown
    // TODO add event listener for nav left, right, return to list
    let array;

    if (Cocktail.filtered.length > 0) {
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
        icon.src = tempRecipe.glassware;
        icon.alt = 'glassware';
        recipeCard.append(icon);

        let ingrs = document.createElement('ul');
        ingrs.setAttribute('class', 'ingredients-list');
        recipeCard.append(ingrs);

        for (let i = 0; i < tempRecipe.ingr.length; i += 1) {
            let oneIng = document.createElement('li');
            ingrs.append(oneIng);
            oneIng.innerHTML = `${i + 1}) ${tempRecipe.ingr[i]} - ${tempRecipe.amount[i]}`
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
const clearFilter = document.getElementById('clear-filter');
clearFilter.addEventListener('click', clearFilterHandler);

function clearFilterHandler() {
    // event.preventDefault();
    clearChildren('recipe-list-grid');
    renderThumbnails(Cocktail.all);
    Cocktail.filtered = [];
    // filterDrinksPossible(0);
}

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
        default:
        return; // If user clicks elsewhere, do nothing
    }
    clearChildren('recipe-list-grid');
    renderThumbnails(Cocktail.filtered);
}

function filterDrinksPossible(tolerance, array = Cocktail.all) {
    // tolerance of 0 if currently possible, tolerance of 1 for one-ingredient-away
    Cocktail.filtered = []; // STRETCH: Change the logic so mult. filters causes multiple passes of array through this function. Allow deselection or clearing of filters.
    Ingredient.missingIngredients = [];
    let inventoryNames = Ingredient.userPlusBasicIngr.map(element => element.name.toLowerCase());
    let inventoryTypes = Ingredient.userPlusBasicIngr.map(element => element.type.toLowerCase());
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
    return Cocktail.filtered;
}

function filterDrinksBySpirit(base, array = Cocktail.all) {
    Cocktail.filtered = [];
    Cocktail.all.forEach(cocktail => {
        if (cocktail.base.toLowerCase() === base) {
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



