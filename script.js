const input = document.getElementById('user-input');
const btn = document.getElementById('enter-btn');
const itemList = document.getElementById('item-list');
const item = document.querySelectorAll('.item');

const defaultTasks = [
    { 
        text: "task1",
        isDone: false
    },
    { 
        text: "task2",
        isDone: false
    }
];

let tasks = JSON.parse(localStorage.getItem('tasks') || JSON.stringify(defaultTasks));

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

    const btnDeleteItem = document.createElement('button');
    btnDeleteItem.innerText = 'Delete';
    btnDeleteItem.classList.add('delete-btn');
    btnDeleteItem.addEventListener('click', clickDeleteItemBtn);

    createdItem.append(textItem, btnDeleteItem);
    itemList.appendChild(createdItem);

    if (task) {
        textItem.innerText = task.text;
        if (task.isDone) {
            createdItem.classList.add('done');
        }
    } else {
        textItem.innerText = input.value;
        tasks.push({text: input.value, isDone: false});
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
        //clickedItem.classList.toggle('done');
        
        const itemText = clickedItem.querySelector('.item-text').innerText;
        if (clickedItem.classList.contains('done')) {
            clickedItem.classList.remove('done');
            updateDone(itemText, false);
        } else {
            clickedItem.classList.add('done');
            updateDone(itemText, true);
        } 
    }
    console.log(tasks)
}
itemList.addEventListener('click', toggleDone);


function updateDone(itemText, status) {
    // const complitedTasks = tasks.map((task) => {
    //     if (task.text === itemText) {
    //         return {...task, isDone: status};
    //     }  
    //     return task;
    // });

    // tasks = complitedTasks;

    for (let task of tasks) {
        if (task.text.trim() === itemText.trim()) {
            task.isDone = status;
        }  
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// delete the ITEM when cliked on the deleteItemBtn
function clickDeleteItemBtn(event) {
    const selectedBtn = event.target;

    if (selectedBtn.classList.contains('delete-btn')) {
        selectedBtn.parentNode.remove();
        const selectedTask = selectedBtn.previousSibling.innerText;

        tasks = tasks.filter((task) => {
            return task.text.trim() !== selectedTask.trim();
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
