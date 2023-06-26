
const todoContainer = document.getElementById('todos');
const addTodoForm = document.getElementById('addTodoForm');
const todoInput = document.getElementById('todoInput');
let todos = [];


// when I DISPLAY ALL THE TODOS

const getTodos = () => {
  return fetch('https://dummyjson.com/todos')
    .then(response => response.json())
    .then(response => {
      todos = response.todos;
      return todos;
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
    });
};

getTodos()
  .then(() => {
    displayTodos();
  })
  .catch(error => {
    console.error('Error getting todos:', error);
  });

  
const displayTodos = () => {
  todoContainer.innerHTML = '';
  todos.forEach(item => {
    let div = document.createElement('div');
    let todo = document.createElement('h2');
    let completed = document.createElement('p');
    let completeButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let updateButton = document.createElement('button');
    todo.innerHTML = item.todo;
    div.style.paddingLeft='30px'
    div.style.borderBottom = '1px solid black';
    div.style.paddingBottom = '30px';
    div.style.paddingTop= '30px';

    div.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';


    completed.innerHTML = `Done: ${item.completed}`;
    completeButton.innerHTML = 'Complete';
    deleteButton.innerHTML = 'Delete';
    updateButton.innerHTML = 'Update';
    div.appendChild(todo);
    div.appendChild(completed);
    div.appendChild(completeButton);
    div.appendChild(deleteButton);
    div.appendChild(updateButton);

    div.setAttribute('key', item.id);
    div.setAttribute('class', 'todo');

    if (item.completed) {
      div.classList.add('completed');
    }
    completeButton.addEventListener('click', () => {
      completeTodoItem(item.id);
    });
    completeButton.style.backgroundColor='#4caf50'
     completeButton.style.padding='10px'
     completeButton.style.border='none'
     completeButton.style.color='white'
     completeButton.style.fontWeight='800'
     completeButton.style.fontSize='18px'
     completeButton.style.borderRadius='10px'


    deleteButton.addEventListener('click', () => {
      deleteTodoItem(item.id);
    });
    deleteButton.style.color='white'
    deleteButton.style.fontWeight='800'
    deleteButton.style.fontSize='18px'
    deleteButton.style.backgroundColor='red'
    deleteButton.style.padding='10px'
    deleteButton.style.border='none'
    deleteButton.style.borderRadius='10px'
    deleteButton.style.marginLeft='20px'


    updateButton.addEventListener('click', () => {
      updateTodoItem(item.id);
    });
    updateButton.style.marginLeft='20px'
    updateButton.style.backgroundColor=' rgb(20, 162, 218)'
    updateButton.style.padding='10px'
    updateButton.style.border='none'
    updateButton.style.borderRadius='10px'
    updateButton.style.color='white'
    updateButton.style.fontWeight='800'
    updateButton.style.fontSize='18px'


    // console.log(todos);

    todoContainer.appendChild(div);
  });
};
const completeTodoItem = (itemId) => {
  const todoItem = todos.find(item => item.id === itemId);
  console.log(`Todo item ${itemId} completed.`);

};



// const deleteTodoItem = (itemId) => {
//   todos = todos.filter(item => item.id !== itemId);
//   console.log(`Todo item ${itemId} deleted.`);
//   displayTodos();
// };
const deleteTodoItem = (itemId) => {
  fetch(`https://dummyjson.com/todos/${itemId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        todos = todos.filter(item => item.id !== itemId);
        console.log(`Todo item ${itemId} deleted.`);
        displayTodos();
      } else {
        console.error(`Error deleting todo item ${itemId}.`);
      }
    })
    .catch(error => {
      console.error('Error deleting todo:', error);
    });
};

const updateTodoItem = (itemId) => {
  const todoItem = todos.find(item => item.id === itemId);
  if (todoItem) {
    const newTodo = prompt('Enter updated task:', todoItem.todo);
    if (newTodo) {
      todoItem.todo = newTodo;
      console.log(`Todo item ${itemId} updated.`);
      displayTodos();
    }
  }
};





// When I ADD A TODO
const addTodo = (todo) => {
  const newTodo = {
    userId: 1,
    todo,
    Completed: false
  };

  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  })
    .then(response => response.json())
    .then(response => {
      console.log('Added todo:', response);
      todos.push(response);
      displayTodos();
    })
    .catch(error => {
      console.error('Error adding todo:', error);
    });
};




addTodoForm.addEventListener('submit', event => {
  event.preventDefault();
  const todo = todoInput.value.trim();
  if (todo) {
    addTodo(todo);
    todoInput.value = '';
  }
});

const displaytodos = () => {
  console.log(todos);
};

getTodos().then(displaytodos);
