const input = document.querySelector('#input'), 
      list = document.querySelector('#list'),
      addBtn = document.querySelector('#add-button')
let listReestr  

!localStorage.listReestr ? listReestr = [] : listReestr = JSON.parse(localStorage.getItem('listReestr'))
filmHtmlTask()

addBtn.addEventListener('click', formTask)

function Task(discription){
    this.discription = discription
    this.completed = false
}

function dltItem (i){
    listReestr.splice(i , 1)
    updateLocal()
    filmHtmlTask()
    console.log(i)
}

function createTemplate(messages, i){
    return `<li class="list__item">
                <div class="item__discription">${messages.discription}</div>
                <div class="item__button">
                    <input type="checkbox" class="item__completed">
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
        })
    }
}

function updateLocal(){
    localStorage.setItem('listReestr', JSON.stringify(listReestr))
}

function formTask(){
    listReestr.push(new Task(input.value))
    filmHtmlTask()
    updateLocal()
    input.value = ''
}
