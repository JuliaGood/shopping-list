const input = document.getElementById('user-input');
const btn = document.getElementById('enter-btn');
const itemList = document.getElementById('item-list');
const item = document.querySelectorAll('.item');

const defaultTasks = ["task1", "task2"];
const tasks = JSON.parse(localStorage.getItem('tasks') || JSON.stringify(defaultTasks));

document.addEventListener('DOMContentLoaded', function () {
    tasks.forEach((task) => {
        createTaskElement(task);
    });
})

const addListAfterClick = () => {
    if (inputLength() > 0) {
        createTaskElement();
    }
}

const addListAfterKeypress = (event) => {
    if (inputLength() > 0 && event.code === 'Enter') {
        createTaskElement();
    }
}

const inputLength = () => {
    return input.value.length;
}

const createTaskElement = (task = null) => {
    const createdItem = document.createElement('div');
    createdItem.classList.add('item');

    const textItem = document.createElement('div');
    textItem.classList.add('item-text');

    const btnItem = document.createElement('button');
    btnItem.innerText = 'Delete';
    btnItem.classList.add('delete-btn');
    btnItem.addEventListener('click', clickDeleteItemBtn);

    createdItem.append(textItem, btnItem);
    itemList.appendChild(createdItem);

    if (task) {
        textItem.innerText = task;
    } else {
        textItem.innerText = input.value;
        tasks.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
    }
}


btn.addEventListener('click', addListAfterClick);
input.addEventListener('keypress', addListAfterKeypress);


//
function toggleDone(event) {
    event.stopPropagation();
    const clickedItem = event.target;
    if (clickedItem.classList.contains('item')) {
        clickedItem.classList.toggle('done');
    }
    console.log(event.target)
}
itemList.addEventListener('click', toggleDone);



// delete the ITEM when cliked on the deleteItemBtn
function clickDeleteItemBtn(event) {
    console.log('event', event);
    const selectedBtn = event.target;

    if (selectedBtn.classList.contains('delete-btn')) {
        selectedBtn.parentNode.remove();
        const selectedTask = selectedBtn.previousSibling.innerText;
        console.log("task", selectedTask);

        const filteredTasks = tasks.filter((task) => {
            return task !== selectedTask;
        })

        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }
}
