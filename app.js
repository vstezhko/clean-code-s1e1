//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

const taskInput=  document.querySelector("#new-task");//Add a new task.
const addButton= document.querySelector(".btn_add");//first button
const incompleteTaskHolder= document.querySelector("#incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder= document.querySelector("#completed-tasks");//completed-tasks

const createNewTaskElement = function(taskString){

  const listItem= document.createElement("li");
  listItem.classList.add("tasks-group__item");

  const checkBox= document.createElement("input"); //checkbx
  checkBox.type = "checkbox";
  checkBox.classList.add("item-checkbox");

  const label= document.createElement("label"); //label
  label.classList.add("tasks-group__label");
  label.innerText = taskString;

  const editInput= document.createElement("input");//text
  editInput.classList.add("tasks-group__task");
  editInput.type = "text";

  const editButton= document.createElement("button");//edit button
  editButton.classList.add('btn', 'btn_edit');
  editButton.innerText = "Edit";

  const deleteButton= document.createElement("button");//delete button
  deleteButton.classList.add('btn', 'btn_delete');

  const deleteButtonImg= document.createElement("img");//delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove button"
  deleteButtonImg.classList.add("btn__img")
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function(){
  if (!taskInput.value) return;
  const listItem= createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

const editTask = function(){

  const listItem= this.parentNode;
  const editInput= listItem.querySelector(".tasks-group__task");
  const label= listItem.querySelector(".tasks-group__label");
  const editBtn= listItem.querySelector(".btn_edit");
  const containsClass= listItem.classList.contains("tasks-group__item_edit");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("tasks-group__item_edit");
};

const deleteTask = function(){
  const listItem= this.parentNode;
  const taskGroup= listItem.parentNode;
  taskGroup.removeChild(listItem);
}

const taskCompleted = function(){
  const listItem= this.parentNode;
  listItem.classList.add("tasks-group__item_done")
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function(){
  const listItem= this.parentNode;
  listItem.classList.remove("tasks-group__item_done")
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function(){
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler){

  const checkBox=taskListItem.querySelector(".item-checkbox");
  const editButton=taskListItem.querySelector(".btn_edit");
  const deleteButton=taskListItem.querySelector(".btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i= 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i= 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}