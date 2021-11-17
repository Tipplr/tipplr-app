'use strict'

function renderIngrTable() {
    const tbodyEl = document.querySelector('tbody');

    for(let i = 0; i < Ingredient.userInventory.length; i += 1){
        const trEl = document.createElement('tr');
        tbodyEl.appendChild(trEl);

        const tdElemRemove = document.createElement('td')
        trEl.appendChild(tdElemRemove);
        tdElemRemove.id = `remove-${i}`;
        tdElemRemove.textContent = "⛔";
        
        const tdElemName = document.createElement('td')
        trEl.appendChild(tdElemName);
        tdElemName.textContent = Ingredient.userInventory[i].name;
        
        const tdElemType = document.createElement('td')
        trEl.appendChild(tdElemType);
        tdElemType.textContent = Ingredient.userInventory[i].type;
        }
    }
    //call getLocalStorage('ingredients')
    //write to DOM a table of ingredients and type from userInventory
function changeInventoryEventListener() {
    //add an event listener to the add new + button and to the - button next to each ingredient in list
    document.getElementById('add-inventory').addEventListener("click", toggleFormDisplay);
}
function inventoryHandler() {
    //if + button is clicked, call showForm()
    //if - button is clicked call removeIngredient()
    //this should alert the user to confirm
}
function toggleFormDisplay() {
    const form = document.querySelector(".inventory-form");
    form.classList.toggle('hidden');
    form.addEventListener('submit', addIngredient);
}



function addIngredient(event) {
    event.preventDefault();

    let name = document.querySelector('#bottle-name').value
    let type = document.querySelector('#bottle-type').value
    let ingredient = new Ingredient(name, type);

    Ingredient.userInventory.push(ingredient);
    saveToLocalStorage(Ingredient.userInventory);

    renderIngrTable();

    //hides and clears form
    toggleFormDisplay();
    document.querySelector('#bottle-name').value = '';
    document.querySelector('#bottle-type').value = '';
}

function removeIngredient() {
    //remove clicked ingredient from the userInventory array
    //saveAndRenderInv() 
}

//Function Execution START:
changeInventoryEventListener()
