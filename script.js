
/* Javascript File */

/* Change Theme */


const theme = document.getElementById("theme-icon");

theme.addEventListener('click', (e) => {
    document.querySelector('body').classList.toggle('light-theme');
})


const newItemInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemsCount = document.querySelector(".leftItems span");
const allItems = todoList.querySelectorAll('li');
const removeItem = document.querySelectorAll(".remove");

itemsCount.innerText = document.querySelectorAll('.list-item input[type="checkbox"]:not(.list-item input[type="checkbox"]:checked)').length;

/* Add todo item */

newItemInput.addEventListener("keypress", (e) => {
if (e.key === 'Enter' && newItemInput.value.length > 0){
    createNewToDoItem(newItemInput.value);
    newItemInput.value = '';
        }
    }
);

function createNewToDoItem(text){
    const elem = document.createElement('li');
    elem.classList = ['flex-row drag-item'];
    elem.draggable = true;
    elem.innerHTML = `
        <label id="list-item">
            <input type="checkbox" name="todoItem">
            <span class="check-mark"></span>
            <span class="text">${text}</span>
        </label>
        <span class="remove"></span>
    `;

    todoList.append(elem);
    updateItemsCount(1);
   
}

function updateItemsCount(number){
    itemsCount.innerText = + itemsCount.innerText + number; 
}

//remove todo item

function removeToDoItem(elem){
    elem.remove();
    updateItemsCount(-1);    
}

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        removeToDoItem(e.target.parentElement);
    }
});

//clear completed

document.querySelector('.clear').addEventListener('click', () => {
    // document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
    //     removeToDoItem(item.closest('li'));
    // });

    allItems.forEach(item => {
        if (item.querySelector('input').checked){
            removeToDoItem(item.closest('li'))
            item.closest('li').remove
        } ;
    })

});

// filter todo items

document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) =>{
        filterTodoItems(e.target.id)
    })
})

function filterTodoItems(id){
    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked? item.classList.add('hidden') : item.classList.remove('hidden');
            })
            break;
        case 'completed':
            allItems.forEach(item => {
                item.querySelector('input').checked? item.classList.remove('hidden') : item.classList.add('hidden');
            })
            break;

    }
}

/* Drag and drop */

todoList.addEventListener('dragstart', (e)=>{
    e.target.classList.add("dragable-element");
});

todoList.addEventListener('dragend', (e)=>{
    e.target.classList.remove("dragable-element");
});

todoList.addEventListener('dragover', (e) => {
    e.preventDefault();

    const dragElement = document.querySelector(".dragable-element");
    const currentElement = e.target;

    const canSort = dragElement !== currentElement && currentElement.classList.contains('drag-item');

    if(!canSort) {return;}

    const nextElement = (currentElement === dragElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;

    todoList.insertBefore(dragElement, nextElement);
});

