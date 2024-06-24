let task = document.querySelector('.container .search-box input');
let allTodos = JSON.parse(localStorage.getItem('todo-list')) || [];
let allTodosBox = document.querySelector('.container .allTodos');
let noOfTasks = document.querySelector('.container .others span');
let clearAllBtn = document.querySelector('.container .others .clear-all-btn');

task.addEventListener('keyup', (e) => {
  if (task.value != '') {
    if (e.key == 'Enter') {
      let editId = task.getAttribute('data-edit-id');
      if (editId !== null) {
        updateTask(editId);
      } else {
        createTodos();
      }
    }
  }
});

let createTodos = () => {
  let userTask = task.value;
  let taskInfo = { taskk: userTask, status: 'pending' };
  if (!allTodos) {
    allTodos = [];
  }
  allTodos.push(taskInfo);
  localStorage.setItem('todo-list', JSON.stringify(allTodos));
  task.value = '';
  task.removeAttribute('data-edit-id');
  showTodos();
}

let showTodos = () => {
  let li = '';
  if (allTodos) {
    allTodos.forEach((todo, id) => {
      let isCompleted = todo.status == 'completed' ? 'checked' : '';
      li += ` <div class="todo">
                   <input type="checkbox" name="" id="${id}" onclick="check(this)" ${isCompleted}>
                   <div class="item">
                       <div class="task">
                           <span class="${isCompleted}">${todo.taskk}</span>
                       </div>
                       <div class="actions">
                           <i class="fa-regular fa-edit" onclick="editTask(${id})"></i>
                           <i class="fa-regular fa-trash-can" onclick="deleteTask(${id})"></i>
                       </div>
                   </div>
               </div>`;
    });
    allTodosBox.innerHTML = li || `<i class="fa-solid fa-list-check no-task-icon"></i>`;
  }
  noOfTasks.innerHTML = `<span>You have <strong>${allTodos.length}</strong> Tasks</span>`;
}

let check = (currentTask) => {
  if (currentTask.checked) {
    currentTask.nextElementSibling.children[0].children[0].classList.add('checked');
    allTodos[currentTask.id].status = 'completed';
  } else {
    currentTask.nextElementSibling.children[0].children[0].classList.remove('checked');
    allTodos[currentTask.id].status = 'pending';
  }
  localStorage.setItem('todo-list', JSON.stringify(allTodos));
}

let editTask = (id) => {
  let taskToEdit = allTodos[id];
  task.value = taskToEdit.taskk;
  task.setAttribute('data-edit-id', id);
}

let updateTask = (id) => {
  allTodos[id].taskk = task.value;
  localStorage.setItem('todo-list', JSON.stringify(allTodos));
  task.value = '';
  task.removeAttribute('data-edit-id');
  showTodos();
}

let deleteTask = (deleteId) => {
  allTodos.splice(deleteId, 1);
  showTodos();
  localStorage.setItem('todo-list', JSON.stringify(allTodos));
}

clearAllBtn.addEventListener('click', () => {
  allTodos = [];
  showTodos();
  localStorage.setItem('todo-list', JSON.stringify(allTodos));
})

showTodos();
