<script setup>
import {reactive, ref, computed} from 'vue';
import Task from "./components/Task.vue";
import Filter from "./components/Filter.vue";
import ModalWindow from "./components/Modal/ModalWindow.vue";
import ModalAddTask from "./components/Modal/ModalAddTask.vue";
import {useTasksStore} from "./stores/tasksStore.js";

const store = useTasksStore();

let newTask = {completed: false};

let modalIsActive = ref(false);

</script>

<template>

  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          Tasks Manager
        </h1>
      </div>
      <div class="header-side">
        <button @click="modalIsActive=true" class="btn secondary">+ Add Task</button>
      </div>
    </div>
    <Filter />
    <div class="tasks">
      <Task v-for="task in store.filteredTasks" :task="task"/>
    </div>
    <ModalWindow @closePopup="modalIsActive=false" v-if="modalIsActive">
      <ModalAddTask />
    </ModalWindow>
  </main>   
</template>


<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}

.filters {
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 14px 0;
    align-items: center;
  }

  .clear {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }

}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input, textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}


</style>