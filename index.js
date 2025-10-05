let ul = document.getElementById('ul');
let input = document.getElementById('input-field');
let add = document.getElementById('add');
let tasks =JSON.parse(localStorage.getItem('tasks')) || [];
renderTask();
add.addEventListener('click', () => {
    let temp = input.value;
    tasks.push(temp);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTask();
})

function renderTask() {
    ul.innerHTML = "";

    tasks.forEach(task => {
        let li = document.createElement('li');
        let taskText = document.createElement('span');
        let btnContainer = document.createElement('div');
        let btnDel = document.createElement('button');
        let btnEdit = document.createElement('button');

        taskText.textContent = task;
        taskText.classList.add('task-text')

        btnEdit.textContent = 'Edit';
        btnEdit.classList.add('edit-btn');
        btnDel.textContent = 'Delete';
        btnDel.classList.add('delete-btn');

        btnContainer.classList.add('button-container');
        btnContainer.appendChild(btnEdit);
        btnContainer.appendChild(btnDel);

        li.appendChild(taskText);
        li.appendChild(btnContainer);
        ul.appendChild(li)
    })
}

ul.addEventListener('click', (event) => {
    const li = event.target.closest('li');
        const taskTextEl = li.querySelector('.task-text');
        const taskText = taskTextEl?.textContent || "";
        const textIndex = tasks.indexOf(taskText);
    if (event.target.classList.contains('delete-btn')){
        if (textIndex !== -1) {
            tasks.splice(textIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTask();
        }
        renderTask();
    }
    if (event.target.classList.contains('edit-btn')) {
        li.innerHTML = '';

        const input = document.createElement('input');
        input.type = "text";
        input.value = taskText;
        li.appendChild(input);

        const btnSave = document.createElement('button');
        btnSave.textContent = 'Save';
        btnSave.classList.add('save-btn');
        li.appendChild(btnSave);

        input.focus();

        btnSave.addEventListener('click', () => {
            const updatedText = input.value.trim();
            if(updatedText) {
                tasks[textIndex] = updatedText;
            }
            renderTask();
        })

    }
})