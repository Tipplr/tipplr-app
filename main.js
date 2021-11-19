const recipeListEventListener = document.getElementById('recipe-list-grid');
recipeListEventListener.addEventListener('click', renderRecipeCard);

const filterButtons = document.getElementById('filter-buttons');
filterButtons.addEventListener('click', filterHandler);


const clearFilter = document.getElementById('clear-filter');
clearFilter.addEventListener('click', clearFilterHandler);

renderThumbnails();

function clearFilterHandler() {
    // event.preventDefault();
    clearChildren('recipe-list-grid');
    renderThumbnails(Cocktail.all);
    Cocktail.filtered = [];
    removeMostValueIngr();
}

function filterHandler(event) {
    switch (event.target.id) {
        case "filter-01":
            filterDrinksPossible(0);
            removeMostValueIngr();
            break;
        case "filter-02":
            filterDrinksBySpirit('gin');
            removeMostValueIngr();
            break;
        case "filter-03":
            filterDrinksBySpirit('whiskey');
            removeMostValueIngr();
            break;
        case "filter-04":
            filterDrinksBySpirit('tequila');
            removeMostValueIngr();
            break;
        case "filter-05":
            filterDrinksBySpirit('rum');
            removeMostValueIngr();
            break;
        case "filter-06":
            filterDrinksBySpirit('vodka');
            removeMostValueIngr();
            break;
        case "filter-07":
            filterDrinksBySpirit('brandy');
            removeMostValueIngr();
            break;
        case "filter-08":
            filterDrinksPossible(1);
            removeMostValueIngr();
            mostValueIngr();
            break;
        case "filter-09":
            filterDrinksBySpirit('other');
            removeMostValueIngr();
            break;
        default:
        return; // If user clicks elsewhere, do nothing
    }
    clearChildren('recipe-list-grid');
    renderThumbnails(Cocktail.filtered);
}

function filterDrinksPossible(tolerance, array = Cocktail.all) {
    // tolerance of 0 if currently possible, tolerance of 1 for one-ingredient-away
    Cocktail.filtered = [];
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



