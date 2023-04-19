//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

const taskInput=document.querySelector("#new-task");//Add a new task.
const addButton=document.querySelector(".btn_add");//first button
const incompleteTaskHolder=document.querySelector("#incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder=document.querySelector("#completed-tasks");//completed-tasks


//New task list item
const createNewTaskElement = function(taskString){

  const listItem= document.createElement("li");
  listItem.classList.add("tasks-group__item");

  //input (checkbox)
  const checkBox= document.createElement("input"); //checkbx
  checkBox.type="checkbox";
  checkBox.classList.add("item-checkbox");

  //label
  const label= document.createElement("label"); //label
  label.classList.add("tasks-group__label");

  //input (text)
  const editInput= document.createElement("input");//text
  editInput.classList.add("tasks-group__task");

  //btn_edit
  const editButton= document.createElement("button");//edit button
  editButton.classList.add('btn', 'btn_edit');

  //button.delete
  const deleteButton= document.createElement("button");//delete button
  deleteButton.classList.add('btn', 'btn_delete');

  const deleteButtonImg= document.createElement("img");//delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove button"
  deleteButtonImg.classList.add("btn__img")
  deleteButton.appendChild(deleteButtonImg);

  label.innerText=taskString;

  editInput.type="text";
  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem= createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.

const editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem= this.parentNode;

  const editInput= listItem.querySelector(".tasks-group__task");
  const label= listItem.querySelector(".tasks-group__label");
  const editBtn= listItem.querySelector(".btn_edit");
  const containsClass= listItem.classList.contains("tasks-group__item_edit");
  //If class of the parent is .tasks-group__item_edit
  if(containsClass){
    //switch to .tasks-group__item_edit
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .tasks-group__item_edit on the parent.
  listItem.classList.toggle("tasks-group__item_edit");
};

//Delete task.
const deleteTask = function(){
  console.log("Delete Task...");
  const listItem= this.parentNode;
  const taskGroup= listItem.parentNode;
  //Remove the parent list item from the ul.
  taskGroup.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem= this.parentNode;
  listItem.classList.add("tasks-group__item_done")
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  const listItem= this.parentNode;
  listItem.classList.remove("tasks-group__item_done")
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function(){
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  const checkBox=taskListItem.querySelector(".item-checkbox");
  const editButton=taskListItem.querySelector(".btn_edit");
  const deleteButton=taskListItem.querySelector(".btn_delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i= 0; i < incompleteTaskHolder.children.length; i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i= 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.