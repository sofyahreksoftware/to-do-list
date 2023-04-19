{
  const tasks = [
    {
      content: "example content",
      done: false,
    },
    {
      content: "example content",
      done: true,
    },
  ];

  toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };
  removeFirstTwoTasks = () => {
    tasks.splice(0, 2);
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

  const render = () => {
    const tasksList = document.querySelector(".js-tasksList");

    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li class="gridTask section__listItem">
    <button class="section__button section__listItemElement js-buttonDone ${
      task.done ? "section__buttonCheckmark" : "section__buttonGreen"
    }"></button> 
    <p class="section__listItemElement section__taskContent
    ${task.done ? "section__taskContent--crossed" : ""}">${task.content}</p>
    <button class="section__button section__buttonRemove section__listItemElement js-buttonRemove">
    </button>
    </li>`;
    }
    tasksList.innerHTML = htmlString;

    bindEvents();
  };

  const init = () => {
    removeFirstTwoTasks();
    render();

    const form = document.querySelector(".js-form");
    const taskInput = document.querySelector(".js-input");

    form.addEventListener("submit", (event) => {
      onFormSubmit(event, taskInput, form);
    });
  };

  init();
}
