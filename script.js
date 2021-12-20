const input = document.getElementById('userInput');
const btn = document.getElementById('enterBtn');
const ul = document.getElementById('itemList');
const liItems = document.querySelectorAll('li');

const inputLength = () => {
    return input.value.length;
}

const createListElement = () => {
    const cretedLi = document.createElement('li');
    cretedLi.appendChild(document.createTextNode(input.value));
    cretedLi.classList.add('li');
    ul.appendChild(cretedLi);
    input.value = '';
}

const addListAfterClick = () => {
    if(inputLength() > 0) {
        createListElement();
    }
}

const addListAfterKeypress = (event) => {
    if(inputLength() > 0 && event.code === "Enter" ) {
        createListElement();
    }
}

btn.addEventListener('click', addListAfterClick);
input.addEventListener('keypress', addListAfterKeypress);


// Tasks for Homework
//1. If you click on the list item, it toggles the .done  class on and off.
function toggleDone(event) {
    const clickedLi = event.target;
    if (clickedLi.classList.contains('li')) {
        return clickedLi.classList.toggle("done");
    }
}

ul.addEventListener("click", toggleDone);

//2. Add buttons next to each list item to delete the item when clicked on its 
// corresponding delete button.

function createDeleteLiBtn(event) {
    const selectedLi = event.target;

    if (selectedLi.classList.contains('li')) {
        if (!selectedLi.querySelector('.deleteBtn')) {
        // create btn dynamically next to list item
            const createdBtn = document.createElement('button');
            createdBtn.appendChild(document.createTextNode("Delete"));
            createdBtn.classList.add('deleteBtn');
            selectedLi.addEventListener('click', clickDeleteLiBtn);
            selectedLi.appendChild(createdBtn);
        }
    }
}


ul.addEventListener("click", createDeleteLiBtn);

// delete the ITEM when cliked on the deleteLiBtn
function clickDeleteLiBtn(event) {
    const selectedBtn = event.target;   

    if (selectedBtn.classList.contains('deleteBtn')) {
        selectedBtn.parentNode.remove(); 
    }
}


//3. BONUS: When adding a new list item, it automatically adds 
// the delete button next to it (hint: be sure to check if new items are clickable too!)

