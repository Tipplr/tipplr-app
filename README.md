# tipplr-app
Tippler or in our case tipplr, a habitual drinker of alcohol.

### Members:
- Andrew Enyeart
- Daniel Jackson
- Erik Savage
- Spencer Tower

### Project Description:
Andrew is a bartender by trade with a substantial collection of bottles at home for making delicious cocktails for himself and guests. He uses a fun app that has fantastic recipes and some helpful features, but the search function is extremely limited, such that when he wants to see what he can make with what he has on hand, he can only search one ingredient at a time. Then he has to read through multiple recipes to determine if he has all the other ingredients, too. We want to build an application that enables the user to filter a list of cocktail recipes based on what they actually have on hand, add their own recipes, organize and save their favorites, or get recommendations on the next bottle they should add to their collection to significantly increase the number of drinks they can make at home.

### Technologies:

- Javascript
- HTML5
- CSS3

### Scope of Functionalities:

#### Home Page:
- 'Filter recipes by':
- filter recipes by base alcohol type
- filter by '1 ingredient away' - shows user which recipes they are on ingredient away from making
- 'Recipes list':
- displays filtered recipes

#### My Inventory:
- add inventory - allows user to input bottle name / type
- renders a list of users current inventory
- allows user to remove inventory items from list

#### My Recipes:
- add new recipe
- displays user created recipes
- takes recipe name, base, ingredients / amount, glassware, instructions, notes

#### Storage:
- utilizes local storage to store and retrieve user's recipes and inventory


### Project Status:

### Additional Resources:
 - [Asana - Tipplr Project](https://app.asana.com/0/1201367791360026/overview)
 - [Google Drive](https://drive.google.com/drive/folders/15NCmAkLO5YskJMwSisfSIme9kqXutvRt)
 - [Work Agreement](https://docs.google.com/document/d/1EWqoIjHevwoeMd498koeLVaLgHBfE0i_gl43d3N-tsg/edit?usp=sharing)
 - [Pitch/MVP](https://docs.google.com/document/d/1yVgFbKpPoL3dMFSfXpoGq8YGnJSBrriiFG2HRkGxpFY/edit?usp=sharing)


### License:
MIT License

Copyright (c) 2021 Tipplr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


### JS Mockup
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


