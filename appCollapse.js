let coll = document.getElementsByClassName('collapsible');
let i;

for (i = 0; i < coll.length; i += 1) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block'
        }
    });
}

// let collapsingFunction = function () {
//     this.classList.toggle('active');
//     let content = this.nextElementSibling;
//     if (content.style.display === 'block') {
//         content.style.display === 'none';
//     } else if (content.style.display === 'none') {
//         content.style.display === 'block'
//     }
// }