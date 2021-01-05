const input = document.getElementById('userInput');
const btn = document.getElementById('enterBtn');
const ul = document.getElementById('itemList');

btn.addEventListener('click', function() {
    if(input.value.length > 0) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(input.value));
        ul.appendChild(li);
        input.value = '';
    }
});

input.addEventListener('keypress', function(event) {
    if(input.value.length > 0 && event.code === "Enter" ) {
        //Deprecated: .which = .keyCode = .charCode === 13
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(input.value));
        ul.appendChild(li);
        input.value = '';
    }
}); 
