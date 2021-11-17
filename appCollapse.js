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
    const newSpecIngrInput = document.createElement('input');
    const newSpecQtyInput = document.createElement('input');
    // need to update so each new field has a unique id
    newSpecIngrInput.setAttribute('type', 'text');
    newSpecIngrInput.setAttribute('name', 'specs');
    newSpecIngrInput.setAttribute('id', 'specs-ingr-new');
    newSpecIngrInput.setAttribute('placeholder', 'Ingredient...');

    newSpecQtyInput.setAttribute('type', 'text');
    newSpecQtyInput.setAttribute('name', 'specs');
    newSpecQtyInput.setAttribute('id', 'specs-qty-new');
    newSpecQtyInput.setAttribute('placeholder', 'Quantity...');

    specForm.append(newSpecIngrInput);
    specForm.append(newSpecQtyInput);
}

add.addEventListener('click', addFunction)

let minusFunction = function (event) {
    event.preventDefault();
    const specForm = document.getElementById('inputSpecs');
    // will throw error if no new spec fields created
    const newSpecIngrInput = document.getElementById('specs-ingr-new');
    const newSpecQtyInput = document.getElementById('specs-qty-new');
    specForm.removeChild(newSpecIngrInput);
    specForm.removeChild(newSpecQtyInput);
}

minusBtn.addEventListener('click', minusFunction);