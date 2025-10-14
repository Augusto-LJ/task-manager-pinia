import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  let tasks = reactive(JSON.parse(localStorage.getItem("tasks")) || []);

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
      newTask.id = tasks.length
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1;
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
