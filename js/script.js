{
  tasks = [];

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

  renderButtons = () => {
  };

  const renderTasks = () => {
    const tasksList = document.querySelector(".js-tasksList");

    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li class="list__item">
 
  <button 
   class="list__button list__button--green list__itemElement js-buttonDone">
   ${task.done ? '<i class="fa fa-check" aria-hidden="true"></i>' : ""}
   </button> 

  <span 
  class="list__itemElement list__taskContent
  ${task.done ? "list__taskContent--crossed" : ""}">
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
    renderButtons();
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
}
