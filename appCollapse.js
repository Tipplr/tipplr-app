let coll = document.getElementsByClassName('collapsible');
let add = document.getElementById('plus');
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
    newSpecInput.setAttribute('id', 'specs');

    specForm.append(newSpecInput);
}

add.addEventListener('click', addFunction)