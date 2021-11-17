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



