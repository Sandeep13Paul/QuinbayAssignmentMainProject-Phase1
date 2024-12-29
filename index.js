const todoInput = document.getElementById("todoInput");
const dateInputContainer = document.getElementById("dateInputContainer");
const dueDateInput = document.getElementById("dueDateInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const completedCountDisplay = document.getElementById("completedCount");
const totalCountDisplay = document.getElementById("totalCount"); // Add total count display
const todoTypeToggle = document.getElementsByName("todoType");

let todos = [];
const server = "server address";

// Toggle the visibility of the date input container based on radio selection
const toggleDateInput = () => {
  const isDateBound =
    document.querySelector('input[name="todoType"]:checked').value ===
    "date-bound";
  dateInputContainer.style.display = isDateBound ? "block" : "none";
};

// Listen to changes on the todo type radio buttons
todoTypeToggle.forEach((radio) => {
  radio.addEventListener("change", toggleDateInput);
});

// Call the toggle function to set the initial state
toggleDateInput();

// Fetch todos from the backend
const fetchTodos = async () => {
  const response = await fetch(`${server}/api/todos`);
  const data = await response.json();
  if (Array.isArray(data)) {
    todos = data;
    checkExpiration(); // Check expiration after fetching todos
    renderTodos();
    updateCounts(); // Update both completed and total counts
  }
};

// Periodically check for expired tasks
const startExpirationCheck = () => {
  setInterval(() => {
    checkExpiration();
    renderTodos();
  }, 60000);
};

// Check for expired tasks
const checkExpiration = () => {
  todos.forEach((todo) => {
    if (todo.dueDate && !todo.completed) {
      const dueDateTime = new Date(todo.dueDate).getTime();
      if (dueDateTime < Date.now()) {
        todo.isExpired = true; // Mark task as expired
      } else {
        todo.isExpired = false; // Task is not expired
      }
    }
  });
};

// Render todos
const renderTodos = () => {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoCard = createTodoCard(
      todo.text,
      todo.dueDate,
      todo.id,
      todo.completed,
      todo.createdAt,
      todo.isExpired
    );
    todoList.appendChild(todoCard);
  });

  updateCounts();
};

// Update counts
const updateCounts = () => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  completedCountDisplay.textContent = `Completed: ${completedCount}`;
  totalCountDisplay.textContent = `Total: ${todos.length}`;
};

const createTodoCard = (
  todoText,
  dueDate,
  taskId,
  isCompleted,
  createdAt,
  isExpired
) => {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todo-card");

  const todoHeader = document.createElement("div");
  todoHeader.classList.add("todo-header");

  const dateElement = document.createElement("span");
  const createdDate = new Date(createdAt);
  dateElement.textContent = `Created: ${createdDate.toLocaleString()}`;
  todoHeader.appendChild(dateElement);

  const dueDateElement = document.createElement("span");
  if (dueDate) {
    const dueDateObj = new Date(dueDate);
    dueDateElement.textContent = ` Due: ${dueDateObj.toLocaleString()}`;
  } else {
    dueDateElement.textContent = " No Due Date";
  }
  todoHeader.appendChild(dueDateElement);

  const textElement = document.createElement("p");
  textElement.textContent = todoText;

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");

  const completeButton = document.createElement("button");
  completeButton.innerHTML = "&#10003;";
  completeButton.classList.add("complete-btn");

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#10005;";
  deleteButton.classList.add("delete-btn");

  // Apply button visibility based on completion state
  if (isCompleted) {
    completeButton.style.display = "none";
    todoCard.classList.add("completed");
  } else if (isExpired) {
    const expiredMessage = document.createElement("div");
    expiredMessage.textContent = "Task expired!";
    expiredMessage.classList.add("task-expired-message");
    completeButton.style.display = "none";
    todoCard.appendChild(expiredMessage); // Display expired message
  }

  // Complete button logic
  completeButton.addEventListener("click", () => {
    fetch(`${server}/api/todos/${taskId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        const todoIndex = todos.findIndex((todo) => todo.id === taskId);
        if (todoIndex > -1) {
          todos[todoIndex].completed = true;
          renderTodos();
          updateCounts();
        }
      });
  });

  // Delete button logic
  deleteButton.addEventListener("click", () => {
    fetch(`${server}/api/todos/${taskId}`, { method: "DELETE" })
      .then(() => {
        todos = todos.filter((todo) => todo.id !== taskId);
        renderTodos();
        updateCounts();
      })
      .catch((error) => {
        alert("Error deleting todo: " + error.message);
      });
  });

  buttonGroup.appendChild(completeButton);
  buttonGroup.appendChild(deleteButton);

  todoCard.appendChild(todoHeader);
  todoCard.appendChild(textElement);
  todoCard.appendChild(buttonGroup);

  return todoCard;
};

// Add todo
const addTodo = () => {
  const todoText = todoInput.value.trim();
  const isDateBound =
    document.querySelector('input[name="todoType"]:checked').value ===
    "date-bound";
  const dueDate = isDateBound
    ? new Date(dueDateInput.value).toISOString()
    : null;

  if (
    !todoText ||
    (isDateBound && (!dueDate || new Date(dueDate) < new Date()))
  ) {
    alert("Please enter valid to-do text and a future due date.");
    return;
  }

  // Send to backend to create the todo
  fetch(`${server}/api/todos`, {
    method: "POST",
    body: JSON.stringify({
      text: todoText,
      dueDate: dueDate,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      todos.push(data);
      checkExpiration();
      renderTodos();
      updateCounts();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });

  todoInput.value = "";
  dueDateInput.value = "";
};

addTodoButton.addEventListener("click", addTodo);

// Fetch todos on page load
fetchTodos();
startExpirationCheck(); // Start the expiration check on page load
