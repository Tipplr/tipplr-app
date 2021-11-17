'use strict'

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
    let coll = document.getElementsByClassName('collapsible');
    let add = document.getElementById('plus');
    let minusBtn = document.getElementById('minus');
    let i;
    
    let collapsingFunction = function () {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block'
        }
    }
    
    for (i = 0; i < coll.length; i += 1) {
        coll[i].addEventListener("click", collapsingFunction)
    }
    
    let addFunction = function (event) {
        event.preventDefault()
        const specForm = document.getElementById('inputSpecs');
        const newSpecInput = document.createElement('input');
    
        newSpecInput.setAttribute('type', 'text');
        newSpecInput.setAttribute('name', 'specs');
        newSpecInput.setAttribute('id', 'specs-new');
    
        specForm.append(newSpecInput);
    }
    
    // add.addEventListener('click', addFunction)
    
    let minusFunction = function (event) {
        event.preventDefault();
        const specForm = document.getElementById('inputSpecs');
        // will throw error if no new spec fields created
        const newSpecInput = document.getElementById('specs-new');
        specForm.removeChild(newSpecInput);
    }
    
    // minusBtn.addEventListener('click', minusFunction);
   
    //makes form fields visible to the user on the inventory page
    //name, type 
    //submit
}

const form = document.querySelector(".inventory-form");
form.addEventListener('submit', addIngredient);

function addIngredient(event) {
    event.preventDefault();
    //function called on form submit
    let name = document.querySelector('#bottle-name').value
    let type = document.querySelector('#bottle-type').value
    let ingredient = new Ingredient(name, type);
    //pushes ingredient into userInventory array
    Ingredient.userInventory.push(ingredient);
    //call saveAndRenderInv()
    saveToLocalStorage(Ingredient.userInventory);
}
function removeIngredient() {
    //remove clicked ingredient from the userInventory array
    //saveAndRenderInv() 
}

//Function Execution START:
renderIngrList();
