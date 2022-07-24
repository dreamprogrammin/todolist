const input = document.querySelector('#input'), 
      list = document.querySelector('#list'),
      addBtn = document.querySelector('#add-button'),
      listComleted = document.querySelector('#list-completed'),
      label = document.querySelector('label')

let listReestr;

!localStorage.listReestr ? listReestr = [] : listReestr = JSON.parse(localStorage.getItem('listReestr'))

const filterCompleted = () => {
    const activeTask = listReestr.length && listReestr.filter(item => item.completed === false)
    const completedTask = listReestr.length && listReestr.filter(item => item.completed === true)
    listReestr = [...activeTask, ...completedTask]
}

filmHtmlTask()


const formTask = () => {
    !input.value ? (label.innerText = 'Введите текст', label.classList.toggle('active')) : (function(){
        label.innerText = ''
        listReestr.push(new Task(input.value))
        filmHtmlTask()
        updateLocal()
        input.value = '' 
     })()
}

addBtn.addEventListener('click', formTask)

function Task(discription){
    this.discription = discription
    this.completed = false
}

function dltItem (i){
    listItems[i].classList.add('delete')
    setTimeout(() => {
        listReestr.splice(i , 1)
        updateLocal()
        filmHtmlTask() 
    }, 200);
}


function createTemplate(messages, i){
    return `<li class="list__item ${messages.completed ? 'checked' : ''}">
                <div class="item__discription">${messages.discription}</div>
                <div class="item__button">
                    <input onclick="completedItem(${i}); completedItemReestr(${i})" type="checkbox" class="item__completed" ${messages.completed ? 'checked' : ''}>
                    <button class="delete__button"  onclick="dltItem(${i})">
                        <img class="icon" src="./img/icon/free-icon-font-trash-3917378.svg" alt="icon,delete">
                    </button>
                </div>
           </li>`
}


function filmHtmlTask(){
    list.innerHTML = ''
    if(listReestr.length > 0){
        filterCompleted()
        listReestr.forEach(function(item,index){
            list.innerHTML += createTemplate(item, index)
        });
        listItems = document.querySelectorAll('.list__item')
    }
}
 

function completedItem (i){
    listReestr[i].completed = !listReestr[i].completed
    if (listReestr[i].completed) {
        listItems[i].classList.add('checked')
    } else {
        listItems[i].classList.remove('checked')
    }
    filmHtmlTask()
    updateLocal()
}




function updateLocal(){
    localStorage.setItem('listReestr', JSON.stringify(listReestr))
}


