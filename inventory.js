'use strict'

function renderIngrTable() {
    const tbodyEl = document.querySelector('tbody');

    for(let i = 0; i < Ingredient.userInventory.length; i += 1){
        const trEl = document.createElement('tr');
        tbodyEl.appendChild(trEl);

        const tdElemRemove = document.createElement('td');
        trEl.appendChild(tdElemRemove);
        const btnElem = document.createElement('button');
        tdElemRemove.appendChild(btnElem);
        btnElem.id = `remove-${i}`;
        btnElem.textContent = "X";
        
        const tdElemName = document.createElement('td')
        trEl.appendChild(tdElemName);
        tdElemName.textContent = Ingredient.userInventory[i].name;
        
        const tdElemType = document.createElement('td')
        trEl.appendChild(tdElemType);
        tdElemType.textContent = Ingredient.userInventory[i].type;
        }
    }

function clearIngrTable() {
    const tbodyEl = document.querySelector('tbody');

    while(tbodyEl.firstChild){
        tbodyEl.removeChild(tbodyEl.firstChild);
    }
}
    //call getLocalStorage('ingredients')
    //write to DOM a table of ingredients and type from userInventory
function inventoryEventListeners() {
    //add an event listener to the add new + button and to the - button next to each ingredient in list
    document.getElementById('add-inventory').addEventListener("click", toggleFormDisplay);
    document.getElementById('inventory-table').addEventListener('click', confirmRemove);
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
    Ingredient.userPlusBasicIngr.push(ingredient);
    alphabetize(Ingredient.userInventory);
    saveToLocalStorage('Ingredient');

    clearIngrTable();
    renderIngrTable();

    //hides and clears form
    toggleFormDisplay();
    document.querySelector('#bottle-name').value = '';
    document.querySelector('#bottle-type').value = '';
}

function confirmRemove(event){
    let id = event.target.id;
    let removePrompt = document.getElementById('confirm-remove');
    let ingrToRemove = document.getElementById('ingr-to-remove');

    if(id.slice(0, 6) === 'remove'){
        ingrToRemove.textContent = `Please confirm removal of Ingredient: ${Ingredient.userInventory[id.slice(-1)].name}`
        removePrompt.classList.remove('hidden');
        removePrompt.addEventListener('click', function(promptEvent){
            if (promptEvent.target.id === 'rmv'){
                // removeIngredient(id);
                Ingredient.userInventory.splice(id.slice(-1), 1);
                removePrompt.classList.add('hidden');
                saveToLocalStorage('Ingredient');
                clearIngrTable();
                renderIngrTable();
            } else if (promptEvent.target.id === 'cnl'){
                removePrompt.classList.add('hidden');
            }
        });
    }   
}

//Function Execution Order:
loadObjects();
renderIngrTable();
inventoryEventListeners();