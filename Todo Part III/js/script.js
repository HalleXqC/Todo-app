const title = document.querySelector('.title');
const content = document.querySelector('.description');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.row')

window.addEventListener('load', () => {
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos', JSON.stringify([]));
    }else{
        const todos = JSON.parse(localStorage.getItem('todos'));

        const newTodos = todos.map((item, index) => {
            return {...item, id: index}
        })
        localStorage.setItem('todos',JSON.stringify(newTodos));

        const template = newTodos.reverse().reduce((prev, {title, content, id, completed, date}) => {
            if(completed){
                return prev + `<div class="col-lg-6 completed mb-4" >${CardTemplate(title, content, date, id)}</div>`;
            }else{
                return prev + `<div class="col-lg-6 mb-4">${CardTemplate(title, content, date, id)}</div>`;
            }
        }, '')
        container.innerHTML = template;
    }
})



submitBtn.addEventListener('click', e => {
    e.preventDefault();

    if(title.value === '' && content.value === '' ){
        alert('Поля не должны быть пустыми!');
    }

    if(title.value !== '' && content.value !== ''){
        const todos = JSON.parse(localStorage.getItem('todos'));

        localStorage.setItem('todos', JSON.stringify([
            ...todos,
            {
                title: title.value,
                content: content.value,
                date: CurrentTime(),
                completed: false
            }
        ]));
        window.location.reload()
    }
})


function CardTemplate(title, content, time, id){
    if(content.length >= 350){
        return`
            <div class="card">
                <div class="card-header text-center bg-dark text-white">
                    <h4>${title}</h4>
                </div>
                <div class="card-body content shorted">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer d-flex justify-content-around">
                    <button onclick="deleteTask(${id})" class="btn btn-danger w-25" data-id="${id}">Delete</button>
                    <button onclick="completeTask(${id})" class="btn btn-success w-25" data-id="${id}">Complete</button>
                    <button onclick="editTask(${id})" class="btn btn-info w-25" data-id="${id}">Edit</button>
                </div>
            </div>
        `
    }else{
        return`
            <div class="card">
                <div class="card-header text-center bg-dark text-white">
                    <h4>${title}</h4>
                </div>
                <div class="card-body content">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex justify-content-around align-items-center">
                    <button onclick="deleteTask(${id})" class="btn btn-danger w-25" data-id="${id}">Delete</button>
                    <button onclick="completeTask(${id})" class="btn btn-success w-25" data-id="${id}">Complete</button>
                    <button onclick="editTask(${id})" class="btn btn-info w-25" data-id="${id}">Edit</button>
                </div>
            </div>
        `
    }
}

function CurrentTime(){
    return `${moment().format('L')} ${moment().format('LTS')}`
}


const body = document.body;
const selector = document.querySelector('.theme-selector');

selector.addEventListener('change', e => {
    const value = e.target.value;

    if(value == 'dark'){
        body.style.background = '#212529'
        localStorage.setItem('themeColor', '#212529');
        localStorage.setItem('theme', 'dark');
    }else if(value == 'light'){
        body.style.background = '#efefef'
        localStorage.setItem('themeColor', '#efefef');
        localStorage.setItem('theme', 'light');
    }else if(value == 'custom'){
        const askColor = prompt('Your custom color? (hex)');
        body.style.background = askColor
        localStorage.setItem('themeColor', askColor);
        localStorage.setItem('theme', 'custom');
    }
})


window.addEventListener('load', () => {
    if(localStorage.getItem('theme')){
        body.style.background = localStorage.getItem('themeColor');
        selector.value = localStorage.getItem('theme');
    }
})


function deleteTask(id){
    const askDelete = confirm('Are u sure?');
    if(!askDelete) return;

    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.filter(item => item.id !== id);

    localStorage.setItem('todos', JSON.stringify(newTodos));
    window.location.reload();
}


function completeTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));

    const newTodos = todos.map(item => {
        if(item.id == id){
            return {
                ...item,
                completed: !item.completed
            }
        }else{
            return item;
        }
    })

    localStorage.setItem('todos', JSON.stringify(newTodos));
    window.location.reload();
}

function editTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id == id){
            return {
                ...item,
                title: prompt('New title', item.title),
                content: prompt('New content', item.content)
            }
        }else{
            return item
        }
    })

    localStorage.setItem('todos', JSON.stringify(newTodos));
    window.location.reload();
}


// Check is Auth
window.addEventListener('load', () => {
    const isAuth = localStorage.getItem('isAuth');

    isAuth === 'true' ? null : window.open('index.html', "_self");
})



// Sign Out

const signOutBtn = document.querySelector('.signOutBtn');

signOutBtn.addEventListener('click', e => {
    e.preventDefault();

    localStorage.setItem('isAuth', 'false');
    window.location.reload();
})



// focused block
// let focusedArrow = document.querySelector('.arrowSign');
// let focusedBlock = document.querySelector('.focused_block');
// let arrow = document.getElementById('#arrow');

// focusedArrow.addEventListener('click', e =>{
//     e.preventDefault();

//     focusedBlock.classList.toggle('focusedBlockMove');
//     arrow.classList.toggle('fa-arrow-right')
// })