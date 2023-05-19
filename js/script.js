tasks = [];

const completeAllTasks = () => {
  const completedTasks = tasks.map((task) => ({ ...task, done: true }));
  tasks = completedTasks;
  render();
};

const hideAllDoneTasks = (doneTask) => {
  doneTask.classList.toggle("list__item--hidden");
};

toggleTaskDone = (index) => {
  const updatedTasks = [
    ...tasks.slice(0, index),
    { ...tasks[index], done: !tasks[index].done },
    ...tasks.slice(index + 1),
  ];

  tasks = updatedTasks;

  render();
};

const removeTask = (index) => {
  tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

  render();
};

const addNewTask = (newTaskContent) => {
  tasks = [...tasks, { content: newTaskContent }];

  render();
};

const onFormSubmit = (event, taskInput, form) => {
  event.preventDefault();

  const newTaskContent = taskInput.value.trim();
  if (newTaskContent !== "") {
    addNewTask(newTaskContent);
  }
  taskInput.focus();
  form.reset();
};

const bindButtonEvents = () => {
  const hideDoneTasksButton = document.querySelector(".js__hideDoneButton");
  const doneTasks = document.querySelectorAll(".js-doneTask");

  if (hideDoneTasksButton) {
    hideDoneTasksButton.addEventListener("click", () => {
      doneTasks.forEach((doneTask) => {
        hideAllDoneTasks(doneTask);
      });
    });
  }

  const checkDoneButton = document.querySelector(".js__checkDoneButton");
  if (checkDoneButton) {
    checkDoneButton.addEventListener("click", () => {
      completeAllTasks();
    });
  }
};

const bindEvents = () => {
  const removingTaskButtons = document.querySelectorAll(".js-buttonRemove");

  removingTaskButtons.forEach((removingTaskButton, index) => {
    removingTaskButton.addEventListener("click", () => {
      removeTask(index);
    });
  });

  const togglingTaskDoneButtons = document.querySelectorAll(".js-buttonDone");

  togglingTaskDoneButtons.forEach((togglingTaskDoneButton, index) => {
    togglingTaskDoneButton.addEventListener("click", () => {
      toggleTaskDone(index);
    });
  });
};

renderButtons = (listItems) => {
  const buttonContainer = document.querySelector(".js-buttons");
  const areAllTasksDone = tasks.every((task) => task.done);
  if (
    listItems.some((listItem) =>
      listItem.classlist.contains("list__item--hidden")
    )
  ) {
    hideDoneTasksButtonText = "Pokaż";
  } else {
    hideDoneTasksButtonText = "Ukryj";
  }

  const buttonContainerHTML = `<button class="section__button js__hideDoneButton">${hideDoneTasksButtonText} ukończone</button>
  <button class="section__button js__checkDoneButton section__checkAllTasksDoneButton"${
    areAllTasksDone ? "disabled" : ""
  }>Oznacz wszystkie</button>`;
  if (tasks.length > 0) {
    buttonContainer.innerHTML = buttonContainerHTML;
  }
  bindButtonEvents();
};

const renderTasks = () => {
  const tasksList = document.querySelector(".js-tasksList");
  const listItems = document.querySelectorAll(".js-doneTask");

  let htmlString = "";
  for (const task of tasks) {
    htmlString += `<li class="list__item  ${task.done ? "js-doneTask" : ""}">
 
  <button 
   class="list__button list__button--green list__itemElement js-buttonDone">
   ${task.done ? '<i class="fa fa-check" aria-hidden="true"></i>' : ""}
   </button> 

  <span 
  class="list__itemElement list__taskContent
  ${task.done ? "js-doneTask list__taskContent--crossed" : ""}">
  ${task.content}
  </span>

  <button
  class="list__button list__buttonRemove list__itemElement js-buttonRemove">
  <i class="fa fa-trash"></i>
  </button>

   </li>`;
  }
  tasksList.innerHTML = htmlString;

  bindEvents();
};

const render = () => {
  renderTasks();
  renderButtons(listItems);
};

const init = () => {
  render();

  const form = document.querySelector(".js-form");
  const taskInput = document.querySelector(".js-input");

  form.addEventListener("submit", (event) => {
    onFormSubmit(event, taskInput, form);
  });
};

init();
