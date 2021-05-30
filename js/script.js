{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, { content: newTaskContent },];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const makeAllTasksDone = () => {
        tasks = tasks.map((task) => { return { content: task.content, done: true } });
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            const hideTask = task.done & hideDoneTasks;

            htmlString += `
            <li class="list__item ${hideTask ? "hide" : ""}">
            <button class="list__button list__button--done js-done">
            ${task.done ? "✔" : ""}</button>
            <span class="list__task${task.done ? " list__task--done" : ""}">
            ${task.content} </span>
            <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `;

        }
        console.log(hideDoneTasks);
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "Lista zadań";

        if (tasks.length) {
            htmlButtons = ` Lista zadań
            <button class="subHeader__button js-hideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button><button class="subHeader__button js-makeAllDone" ${tasks.every((task => task.done)) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
        };
        document.querySelector(".js-subHeader").innerHTML = htmlButtons;

    };

    const bindButtonsEvents = () => {
        const makeAllTasksDoneButton = document.querySelector(".js-makeAllDone");
        if (makeAllTasksDoneButton) {
            makeAllTasksDoneButton.addEventListener("click", () => {
                makeAllTasksDone();
            });
        };

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
    };
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}