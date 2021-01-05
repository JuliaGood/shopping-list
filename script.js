const input = document.getElementById('userInput');
const btn = document.getElementById('enterBtn');
const ul = document.getElementById('itemList');

const inputLength = () => {
    return input.value.length;
}

const createListElement = () => {
    const li = document.createElement('li');
        li.appendChild(document.createTextNode(input.value));
        ul.appendChild(li);
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
