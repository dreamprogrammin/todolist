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

function createTemplate(messages, i){
    return `<li class="list__item">
                <div class="item__discription">${messages.discription}</div>
                <input type="checkbox" class="item__completed">
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
