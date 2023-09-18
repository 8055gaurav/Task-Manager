function add2() {
    const title = document.getElementById("tasktitle").value;
    const date = document.getElementById("taskdate").value;
    const type = document.getElementById("tasktype").value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // const tasks1 = localStorage.getItem('tasks');
    // const tasks = "";
    // if(tasks1.length!==0){
    //      tasks = JSON.parse(tasks1);
    // }else{
    //    tasks = [];
    // }
    // console.log("in the add func")
    // console.log(title)
    // console.log(type)
    // console.log(tasks)
    const data = {
        title: title,
        date: date,
        type: type,
        completed: false,
    };
    tasks.push(data);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
    display1()
  }
  
  function display() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const list = document.getElementById("Alltasks");
    if (list) {
        list.innerHTML = "";
    }
  
    for (const task of tasks) {
        const taskElement = document.createElement("div");
        taskElement.innerHTML = `
            <p class="ttitle">${task.title}</p>
            <p class="tdate">${task.date}</p>
            <p class="ttype">${task.type}</p>`;
  
        if (task.completed) {
            taskElement.classList.add("complete");
        }
  
        const editButton = createButton("edit", () =>
            editTask(task, tasks.indexOf(task), taskElement)
        );
        const completeButton = createButton("complete", () =>
            completeTask(task, tasks.indexOf(task), taskElement)
        );
        const deleteButton = createButton("delete", () =>
            deleteTask(task, tasks.indexOf(task), taskElement)
        );
  
        taskElement.classList.add("task");
        deleteButton.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        taskElement.appendChild(editButton);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);
        if (list) {
            list.appendChild(taskElement);
        }5
    }
  }

  
  function display1() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    for (const task of tasks) {
        console.log(task);
        const taskElement = document.createElement("div");
        taskElement.innerHTML = `
            <p class="ttitle">${task.title}</p>
            <p class="tdate">${task.date}</p>
            <p class="ttype">${task.type}</p>`;
  
        if (task.completed) {
            taskElement.classList.add("complete");
        }
  
        const editButton = createButton("edit", () =>
            editTask(task, tasks.indexOf(task), taskElement)
        );
        const completeButton = createButton("complete", () =>
            completeTask(task, tasks.indexOf(task), taskElement)
        );
        const deleteButton = createButton("delete", () =>
            deleteTask(task, tasks.indexOf(task), taskElement)
        );
  
        taskElement.classList.add("task");
        taskElement.appendChild(editButton);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);
  
        // Use if...else if conditions to categorize tasks
        if (task.type == "Work") {
            const workContainer = document.getElementById("Worktasks");
            console.log(workContainer);
            workContainer.appendChild(taskElement);
        } else if (task.type == "urgent") {
            const urgentContainer = document.getElementById("urgenttasks");
            console.log(urgentContainer);
            urgentContainer.appendChild(taskElement);
        } else if (task.type == "Personal") {
            const personalContainer = document.getElementById("Personaltasks");
            console.log(personalContainer);
            personalContainer.appendChild(taskElement);
        } else if (task.type == "Gamming") {
            const gammingContainer = document.getElementById("Gammingtasks");
            console.log(gammingContainer);
            gammingContainer.appendChild(taskElement);
        } else if (task.type == "Shopping") {
            const shoppingContainer = document.getElementById("Shoppingtasks");
            console.log(shoppingContainer);
            shoppingContainer.appendChild(taskElement);
        }
    }
  }
  
  function createButton(text, onClickFunction) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClickFunction;
    return button;
  }
  
  function appendToCategory(categoryId, taskElement) {
    const categoryContainer = document.getElementById(categoryId);
    if (categoryContainer) {
        categoryContainer.appendChild(taskElement.cloneNode(true)); // Clone the element to avoid moving it
    }
  }
  
  function editTask(data, index, taskElement) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newtask = prompt("Enter new task");
    location.reload();
    data.title = newtask;
    taskElement.firstChild.innerHTML = `<p>${newtask}</p>`;
    tasks[index] = data;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display()
  }
  
  function deleteTask(data, index, taskElement) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskElement.remove();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
  }
  
  function completeTask(data, index, taskElement) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!data.completed) {
        taskElement.classList.add("complete");
        data.completed = true;
    } else {
        taskElement.classList.remove("complete");
        data.completed = false;
    }
    tasks[index] = data;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
  }
  const taskdivs = document.querySelectorAll(".taskdiv")
  console.log(taskdivs)
  const taskbuttons = document.querySelectorAll(".tags");
  console.log(taskbuttons);
  
  function remove(button) {
    const parentElement = button.parentElement;
    parentElement.classList.add("hidden");
  }
  taskbuttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonid = button.id
        const targetId = buttonid + "tasks"
        console.log(targetId)
        taskdivs.forEach(div => {
            if (div.id === targetId) {
                div.classList.remove("hidden");
            } else {
                div.classList.add("hidden");
            }
        })
    });
  })
  display();
  display1();






const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchTasks);

function searchTasks() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.date.includes(searchTerm) ||
        task.type.toLowerCase().includes(searchTerm)
    );

    // Update the display functions to show the filtered tasks
    displayFilteredTasks(filteredTasks);
}




function displayFilteredTasks(filteredTasks) {
    const list = document.getElementById("Alltasks");
    list.innerHTML = "";

    for (const task of filteredTasks) {
        const taskElement = createTaskElement(task);
        list.appendChild(taskElement);
    }
}

  function createTaskElement(task) {
      const taskElement = document.createElement("div");
      taskElement.innerHTML = `
          <p class="ttitle">${task.title}</p>
          <p class="tdate">${task.date}</p>
          <p class="ttype">${task.type}</p>`;

      return taskElement;
  }






















function add2() {
    const title = document.getElementById("tasktitle").value;
    const inputDate = new Date(document.getElementById("taskdate").value);
    const currentDate = new Date();

    if (inputDate < currentDate) {
        alert("The selected due date is in the past. Please choose a valid future date.");
        return;
    }

    const type = document.getElementById("tasktype").value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const data = {
        title: title,
        date: inputDate.toISOString().split("T")[0], 
        type: type,
        completed: false,
    };
    tasks.push(data);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
    display1();
}
// ... Your existing code ...

const sortDateButton = document.getElementById("sortDate");
sortDateButton.addEventListener("click", sortTasksByDate);

const sortCategoryButton = document.getElementById("sortCategory");
sortCategoryButton.addEventListener("click", sortTasksByCategory);

function sortTasksByDate() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
    display1();
}

function sortTasksByCategory() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.sort((a, b) => a.type.localeCompare(b.type));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
    display1();
}
