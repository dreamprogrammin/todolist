const input = document.querySelector('#input'), 
      list = document.querySelector('#list'),
      addBtn = document.querySelector('#add-button'),
      listComleted = document.querySelector('#list-completed')

let listReestr  

let listItems = []
let listReestrCompleted;


!localStorage.listReestr ? listReestr = [] : listReestr = JSON.parse(localStorage.getItem('listReestr'))
!localStorage.listReestrCompleted ? listReestrCompleted = [] : listReestrCompleted = JSON.parse(localStorage.getItem('listReestrCompleted'))

filmHtmlTask()
createHtmlCompleted()

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
                    <input onclick="completedItem(${i})" type="checkbox" class="item__completed" ${messages.completed ? 'checked' : ''}>
                    <button class="delete__button" onclick="dltItem(${i})">
                        <img class="icon" src="./img/icon/free-icon-font-trash-3917378.svg" alt="icon,delete">
                    </button>
                </div>
           </li>`
}


function filmHtmlTask(){
    list.innerHTML = ''
    if(listReestr.length > 0){
        listReestr.forEach(function(item,index){
            list.innerHTML += createTemplate(item, index)
        });
        listItems = document.querySelectorAll('.list__item')
    }
}

function createHtmlCompleted (){
    listComleted.innerHTML = ''
    if(listReestrCompleted.length > 0) {
        listReestrCompleted.forEach((element, index) =>{
            listComleted.innerHTML += createTemplate(element, index)
        })
    }
} 

function completedItem (i){
    listReestr[i].completed = !listReestr[i].completed
    if (listReestr[i].completed) {
        listItems[i].classList.add('checked')
        listReestrCompleted.push(listReestr[i])
            setTimeout(() => {
                listReestr.splice(i , 1)
                filmHtmlTask()
                updateLocal()
                createHtmlCompleted()
            }, 1000);
    } else {
        listItems[i].classList.remove('checked')
    }
    filmHtmlTask()
    updateLocal()
    createHtmlCompleted()
}


function updateLocal(){
    localStorage.setItem('listReestr', JSON.stringify(listReestr))
    localStorage.setItem('listReestrCompleted' , JSON.stringify(listReestrCompleted))
}

function formTask(){
    listReestr.push(new Task(input.value))
    filmHtmlTask()
    updateLocal()
    input.value = ''
}
