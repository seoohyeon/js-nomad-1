const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    li.appendChild(span); 
    span.innerText = newToDo.text;
    toDoList.appendChild(li);

    const button = document.createElement("button");
    button.innerText = "Delete";
    li.appendChild(button);
    button.addEventListener("click", deleteToDo);
}


function deleteToDo(event){
  const li = event.target.parentElement;
  toDos = toDos.filter((item) => item.id !== Number(li.id));
  li.remove();
  saveToDos()
}


function handleToDoSumbit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text : newToDo,
        id: Date.now(),
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSumbit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);  
    toDos = parsedToDos;  
    console.log(toDos);
    parsedToDos.forEach(paintToDo);
}