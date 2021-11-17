let coll = document.getElementsByClassName('collapsible');
let add = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let i;
// incrementor for new specs id
// starts at 1 because initial field is 0
let newSpecsId = 1;

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
    const newSpecAmntInput = document.createElement('input');
    // need to update so each new field has a unique id
    newSpecIngrInput.setAttribute('type', 'text');
    newSpecIngrInput.setAttribute('name', 'specs');
    newSpecIngrInput.setAttribute('id', `specs-ingr-${newSpecsId}`);
    newSpecIngrInput.setAttribute('placeholder', 'Ingredient...');
    console.log('newSpecIngrInput Id: ' + newSpecIngrInput.id);

    newSpecAmntInput.setAttribute('type', 'text');
    newSpecAmntInput.setAttribute('name', 'specs');
    newSpecAmntInput.setAttribute('id', `specs-amnt-${newSpecsId}`);
    newSpecAmntInput.setAttribute('placeholder', 'Amount...');
    console.log('newSpecAmntInput Id: ' + newSpecAmntInput.id);

    specForm.append(newSpecIngrInput);
    specForm.append(newSpecAmntInput);

    newSpecsId += 1;

}

add.addEventListener('click', addFunction)

let minusFunction = function (event) {
    event.preventDefault();
    const specForm = document.getElementById('inputSpecs');
    // will throw error if no new spec fields created
    const newSpecIngrInput = document.getElementById('specs-ingr-new');
    const newSpecQtyInput = document.getElementById('specs-amnt-new');
    specForm.removeChild(newSpecIngrInput);
    specForm.removeChild(newSpecQtyInput);
}

minusBtn.addEventListener('click', minusFunction);

function getNewSpecsCount() {

}