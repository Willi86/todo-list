
/* First i will connect the javascript to the HTML id's 
the add button which will add the new tasks.
The input which is the text we will write .
the ul which is the list that will have the to do tasks.

*/ 
const addButton = document.getElementById("add_button");
const textInput = document.getElementById("textInput");
const List = document.getElementById("List");


// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Here i am adding an event listener for the add button, that will fire  the addTask
addButton.addEventListener("click", addTask);
// this is the addTask function  
function addTask() {
  const task = textInput.value.trim(); // here we are taking the value of the textInput and trim white spaces .
  if (task) { // here if statement that checks the condition "task variable", if its true (has text) then it will continue with the function 
    createTaskElement(task); //here after task is true , it fires this function with task as an argument.
    textInput.value = "";// this is just to clear the inout field after the task is added
    saveTasks(); // Call saveTasks after task is added
  } else { // the the else part where if the user didn't write anything in the inout field it would show an alert
    alert("You need to write something");
  }
}
// this function is where the list item (li) is created
function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.textContent = task;
  List.appendChild(listItem);
  // Create and add a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteTask";
  listItem.appendChild(deleteBtn);

  // Event listener for the delete button
  deleteBtn.addEventListener("click", function () {
    event.stopPropagation(); // Prevent event from bubbling up to the list item

    List.removeChild(listItem);
    saveTasks(); // Save after deleting the item
  });

  // Event listener to mark task as completed
  listItem.addEventListener("click", function () {
    listItem.classList.toggle("completed"); // Toggle 'completed' class

    saveTasks(); // Save the state change to localStorage

    // Show fireworks when task is completed
    if (listItem.classList.contains("completed")) {
      fireworkEffect();
    }
  });
}

function fireworkEffect() {
  // Trigger canvas confetti to show fireworks celebration when task is finished
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function saveTasks() { // this is the function to save to local storage
  let tasks = []; //create an array 
  List.querySelectorAll("li").forEach(function (item) {
    tasks.push({
      text: item.textContent.replace("Delete", "").trim(), // this is to remove the delete button text from the item otherwise it will save it with the text DELETE
      completed: item.classList.contains("completed"), // Store completion state
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")); // Load tasks from localStorage
  if (savedTasks) {   // Check if there are saved task
    savedTasks.forEach(function (task) { // Loop through each saved task
      createTaskElement(task.text);// Re-create the task element for each saved task using its text
      if (task.completed) {
        List.lastElementChild.classList.add("completed"); // Mark completed tasks
      }
    });
  }
}
