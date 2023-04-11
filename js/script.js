const tasks = [
  {
    content: "example content",
    done: true || false,
  },
  {
    content: "example content",
    done: true || false,
  },
];

const removeTask = (index) => {
  tasks.splice(index, 1);
  render();
};

const addNewTask = (newTaskContent) => {
  tasks.push({ content: newTaskContent });
  render();
};

const onFormSubmit = (event, taskInput, form) => {
  event.preventDefault();

  let newTaskContent = taskInput.value.trim();
  if (newTaskContent === "") {
    taskInput.focus();
    form.reset();
  } else {
    addNewTask(newTaskContent);
    form.reset();
  }
};

const render = () => {
  const tasksList = document.querySelector(".js-tasksList");

  let htmlString = "";
  for (const task of tasks) {
    htmlString += `<li class="gridTask section__listItem">
     <button class="section__button section__buttonDone1 gridTask__item js-buttonDone"></button>
     <p class="gridTask__item"> ${task.content}</p>
     <button class="section__button section__buttonRemove gridTask__item js-buttonRemove"></button>
     </li>`;
  }
  tasksList.innerHTML = htmlString;

  const removingTaskButtons = document.querySelectorAll(".js-buttonRemove");

  removingTaskButtons.forEach((removingTaskButton, index) => {
    removingTaskButton.addEventListener("click", () => {
      removeTask(index);
    });
  });

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
