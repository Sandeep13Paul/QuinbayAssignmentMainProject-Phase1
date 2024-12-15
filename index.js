// const todoInput = document.getElementById("todoInput");
// const timeInputContainer = document.getElementById("timeInputContainer");
// const timeInput = document.getElementById("timeInput");
// const addTodoButton = document.getElementById("addTodo");
// const todoList = document.getElementById("todoList");
// const completedCountDisplay = document.getElementById("completedCount");
// const todoTypeToggle = document.getElementsByName("todoType");

// let completedCount = 0;

// const updateCompletedCount = () => {
//   completedCountDisplay.textContent = `Completed: ${completedCount}`;
// };

// const toggleTimeInput = () => {
//   const selectedType = [...todoTypeToggle].find((radio) => radio.checked).value;
//   timeInputContainer.style.display =
//     selectedType === "time-bound" ? "flex" : "none";
// };

// todoTypeToggle.forEach((radio) => {
//   radio.addEventListener("change", toggleTimeInput);
// });

// const createTodoCard = (todoText, timeLimit, isTimeBound) => {
//   const todoCard = document.createElement("div");
//   todoCard.classList.add("todo-card");

//   const todoHeader = document.createElement("div");
//   todoHeader.classList.add("todo-header");

//   const dateElement = document.createElement("span");
//   dateElement.textContent = `Created: ${new Date().toLocaleString()}`;

//   todoHeader.appendChild(dateElement);

//   const textElement = document.createElement("p");
//   textElement.textContent = todoText;

//   const buttonGroup = document.createElement("div");
//   buttonGroup.classList.add("button-group");

//   const completeButton = document.createElement("button");
//   completeButton.innerHTML = "&#10003;";
//   completeButton.classList.add("complete-btn");

//   const deleteButton = document.createElement("button");
//   deleteButton.innerHTML = "&#10005;";
//   deleteButton.classList.add("delete-btn");

//   const editButton = document.createElement("button");
//   editButton.innerHTML = "&#9998;";
//   editButton.classList.add("edit-btn");

//   let timerInterval;
//   let taskCompleted = false;

//   if (timeLimit) {
//     const timer = document.createElement("span");
//     timer.textContent = `Time left: ${timeLimit} mins`;

//     timerInterval = setInterval(() => {
//       timeLimit--;
//       timer.textContent = `Time left: ${timeLimit} mins`;

//       if (timeLimit <= 0) {
//         clearInterval(timerInterval);
//         if (!taskCompleted) {
//           timer.textContent = "Time expired!";
//           completeButton.style.display = "none";
//           editButton.style.display = "none";

//           const expiredMessage = document.createElement("div");
//           expiredMessage.textContent = "Task not completed within time.";
//           expiredMessage.classList.add("task-expired-message");
//           todoCard.appendChild(expiredMessage);
//         }
//       }
//     }, 60000);

//     todoCard.appendChild(timer);
//   }

//   completeButton.addEventListener("click", () => {
//     taskCompleted = true;
//     clearInterval(timerInterval);
//     todoCard.classList.add("completed");
//     completedCount++;

//     if (isTimeBound) {
//       const timerElement = todoCard.querySelector("span");
//       if (timerElement) timerElement.remove();
//     }

//     completeButton.style.display = "none";
//     editButton.style.display = "none";

//     deleteButton.style.textDecoration = "none";

//     updateCompletedCount();
//   });

//   deleteButton.addEventListener("click", () => {
//     if (todoCard.classList.contains("completed")) {
//       completedCount--;
//     }
//     todoCard.remove();
//     updateCompletedCount();
//   });

//   editButton.addEventListener("click", () => {
//     const newTodoText = prompt("Edit your to-do:", textElement.textContent);
//     if (newTodoText) {
//       textElement.textContent = newTodoText;
//     }
//   });

//   buttonGroup.appendChild(completeButton);
//   buttonGroup.appendChild(editButton);
//   buttonGroup.appendChild(deleteButton);

//   todoCard.appendChild(todoHeader);
//   todoCard.appendChild(textElement);
//   todoCard.appendChild(buttonGroup);

//   return todoCard;
// };

// const addTodo = () => {
//   const todoText = todoInput.value.trim();
//   const isTimeBound =
//     document.querySelector('input[name="todoType"]:checked').value ===
//     "time-bound";
//   const timeLimit = isTimeBound ? parseInt(timeInput.value, 10) : null;

//   if (!todoText || (isTimeBound && (isNaN(timeLimit) || timeLimit <= 0))) {
//     alert("Please enter valid to-do text and time limit (if time-bound).");
//     return;
//   }

//   const todoCard = createTodoCard(todoText, timeLimit, isTimeBound);
//   todoList.appendChild(todoCard);
//   todoInput.value = "";
//   timeInput.value = "";
// };

// addTodoButton.addEventListener("click", addTodo);
// updateCompletedCount();

const todoInput = document.getElementById("todoInput");
const timeInputContainer = document.getElementById("timeInputContainer");
const timeInput = document.getElementById("timeInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const completedCountDisplay = document.getElementById("completedCount");
const totalCountDisplay = document.getElementById("totalCount"); // Added for total count display
const todoTypeToggle = document.getElementsByName("todoType");

let completedCount = 0;
let totalCount = 0; // Initialize total todos count

const updateCompletedCount = () => {
  completedCountDisplay.textContent = `Completed: ${completedCount}`;
};

const updateTotalCount = () => {
  totalCountDisplay.textContent = `Total Todos: ${totalCount}`; // Update total todos count
};

const toggleTimeInput = () => {
  const selectedType = [...todoTypeToggle].find((radio) => radio.checked).value;
  timeInputContainer.style.display =
    selectedType === "time-bound" ? "flex" : "none";
};

todoTypeToggle.forEach((radio) => {
  radio.addEventListener("change", toggleTimeInput);
});

const createTodoCard = (todoText, timeLimit, isTimeBound) => {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todo-card");

  const todoHeader = document.createElement("div");
  todoHeader.classList.add("todo-header");

  const dateElement = document.createElement("span");
  dateElement.textContent = `Created: ${new Date().toLocaleString()}`;

  todoHeader.appendChild(dateElement);

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

  const editButton = document.createElement("button");
  editButton.innerHTML = "&#9998;";
  editButton.classList.add("edit-btn");

  let timerInterval;
  let taskCompleted = false;

  if (timeLimit) {
    const timer = document.createElement("span");
    timer.textContent = `Time left: ${timeLimit} mins`;

    timerInterval = setInterval(() => {
      timeLimit--;
      timer.textContent = `Time left: ${timeLimit} mins`;

      if (timeLimit <= 0) {
        clearInterval(timerInterval);
        if (!taskCompleted) {
          timer.textContent = "Time expired!";
          completeButton.style.display = "none";
          editButton.style.display = "none";

          const expiredMessage = document.createElement("div");
          expiredMessage.textContent = "Task not completed within time.";
          expiredMessage.classList.add("task-expired-message");
          todoCard.appendChild(expiredMessage);
        }
      }
    }, 60000);

    todoCard.appendChild(timer);
  }

  completeButton.addEventListener("click", () => {
    taskCompleted = true;
    clearInterval(timerInterval);
    todoCard.classList.add("completed");
    completedCount++;

    if (isTimeBound) {
      const timerElement = todoCard.querySelector("span");
      if (timerElement) timerElement.remove();
    }

    completeButton.style.display = "none";
    editButton.style.display = "none";

    deleteButton.style.textDecoration = "none";

    updateCompletedCount();
  });

  deleteButton.addEventListener("click", () => {
    if (todoCard.classList.contains("completed")) {
      completedCount--;
    }
    todoCard.remove();
    totalCount--; // Decrement total todos count on delete
    updateCompletedCount();
    updateTotalCount(); // Update the total todos count
  });

  editButton.addEventListener("click", () => {
    const newTodoText = prompt("Edit your to-do:", textElement.textContent);
    if (newTodoText) {
      textElement.textContent = newTodoText;
    }
  });

  buttonGroup.appendChild(completeButton);
  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  todoCard.appendChild(todoHeader);
  todoCard.appendChild(textElement);
  todoCard.appendChild(buttonGroup);

  return todoCard;
};

const addTodo = () => {
  const todoText = todoInput.value.trim();
  const isTimeBound =
    document.querySelector('input[name="todoType"]:checked').value ===
    "time-bound";
  const timeLimit = isTimeBound ? parseInt(timeInput.value, 10) : null;

  if (!todoText || (isTimeBound && (isNaN(timeLimit) || timeLimit <= 0))) {
    alert("Please enter valid to-do text and time limit (if time-bound).");
    return;
  }

  const todoCard = createTodoCard(todoText, timeLimit, isTimeBound);
  todoList.appendChild(todoCard);

  totalCount++; // Increment total todos count
  updateTotalCount(); // Update the total todos count
  todoInput.value = "";
  timeInput.value = "";
};

addTodoButton.addEventListener("click", addTodo);

updateCompletedCount();
updateTotalCount(); // Initial call to set the total todos count
