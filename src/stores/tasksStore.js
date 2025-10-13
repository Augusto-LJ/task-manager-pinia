import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  let tasks = reactive([
    {
      name: "Website design",
      description:
        "Define the style guide, branding and create the webdesign on Figma.",
      completed: false,
      id: 1,
    },
    {
      name: "Website development",
      description: "Develop the portfolio website using Vue JS.",
      completed: false,
      id: 2,
    },
    {
      name: "Hosting and infrastructure",
      description:
        "Define hosting, domain and infrastructure for the portfolio website.",
      completed: false,
      id: 3,
    },
    {
      name: "Composition API",
      description:
        "Learn how to use the composition API and how it compares to the options API.",
      completed: true,
      id: 4,
    },
    {
      name: "Pinia",
      description: "Learn how to setup a store using Pinia.",
      completed: true,
      id: 5,
    },
    {
      name: "Groceries",
      description: "Buy rice, apples and potatos.",
      completed: false,
      id: 6,
    },
    {
      name: "Bank account",
      description: "Open a bank account for my freelance business.",
      completed: false,
      id: 7,
    },
  ]);

  let filterBy = ref("");

  let modalIsActive = ref(false);

  function setFilter(value) {
    filterBy.value = value;
  }

  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case "todo":
        return tasks.filter((x) => !x.completed);
      case "done":
        return tasks.filter((x) => x.completed);
      default:
        return tasks;
    }
  });

  function addTask(newTask) {
    if (newTask.name && newTask.description) {
      newTask.id = Math.max(...tasks.map((task) => task.id)) + 1;
      tasks.push(newTask);
      closeModal();
    } else {
      alert("Please fill the blank spaces");
    }
  }

  function toggleCompleted(id) {
    let targetTask = tasks.find((x) => x.id === id);
    targetTask.completed = !targetTask.completed;
  }

  function openModal() {
    modalIsActive.value = true;
  }

  function closeModal() {
    modalIsActive.value = false;
  }

  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    addTask,
    toggleCompleted,
    modalIsActive,
    openModal,
    closeModal,
  };
});
