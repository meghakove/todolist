var todos = [];

var addTodoForm = document.querySelector("#addTodoForm");
var listGroup = document.querySelector(".list-group");

// Function to create a list item for a to-do
function createListItem(todoValue, todoIndex, completed = false) {
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item d-flex justify-content-between");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input";
  checkbox.checked = completed;

  var label = document.createElement("label");
  label.className = "form-check-label";
  label.textContent = todoValue;

  // Add an event listener to the checkbox to toggle the 'completed' class on the label
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      label.classList.add("completed");
    } else {
      label.classList.remove("completed");
    }

    // Update the 'completed' property in the todos array
    todos[todoIndex].completed = checkbox.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  var icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash-alt");
  icon.addEventListener("click", function (event) {
    event.stopPropagation();
    event.target.parentElement.remove();
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(icon);

  // Add the checkbox in front of the label
  li.insertBefore(checkbox, label);

  // Apply the 'completed' class if the task is already completed
  if (completed) {
    label.classList.add("completed");
  }

  return li;
}

function renderTodos(todos) {
  todos.forEach(function (todo, index) {
    var li = createListItem(todo.value, index, todo.completed);
    listGroup.appendChild(li);
  });
}

var storedTodos = localStorage.getItem("todos");

if (storedTodos) {
  var parsedStoredTodos = JSON.parse(storedTodos);
  todos = parsedStoredTodos;
  renderTodos(todos);
}

addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var todoValue = addTodoForm.todo.value;

  todos.push({
    value: todoValue,
    completed: false,
  });

  addTodoForm.todo.value = "";

  localStorage.setItem("todos", JSON.stringify(todos));

  var li = createListItem(todoValue, todos.length - 1);
  listGroup.appendChild(li);
});
