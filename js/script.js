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
    htmlString += `<li class="grid section__listItem">
     <button class="section__button section__buttonDone1 grid__item js-buttonDone"></button>
     <p class="grid__item"> ${task.content}</p>
     <button class="section__button section__buttonRemove grid__item js-buttonRemove"></button>
     </li>`;
  }
  tasksList.innerHTML = htmlString;
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

