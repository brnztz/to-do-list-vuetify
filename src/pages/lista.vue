<template>
    <v-container style="max-width: 500px">
      <h2 class="text-h4 text-white ps-4">
        Tarefas:&nbsp;
        <v-fade-transition leave-absolute>
          <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
        </v-fade-transition>
      </h2>
  
      <v-divider class="mt-4"></v-divider>
  
      <v-row align="center" class="my-1">
        <strong class="mx-4 text-info-darken-2 text-primary">Restantes: {{ remainingTasks }}</strong>
        <v-divider vertical></v-divider>
        <strong class="mx-4 text-success-darken-2 text-success">Concluídas: {{ completedTasks }}</strong>
        <v-spacer></v-spacer>
        <v-progress-circular v-model="progress" class="me-2"></v-progress-circular>
      </v-row>
  
      <v-divider class="mb-4"></v-divider>
  
      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition class="py-0" tag="v-list" group>
          <template v-for="(task, i) in tasks" :key="`${task.id}`">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
            <v-list-item>
              <template v-if="!task.editMode">
                <v-list-item-action>
                  <v-checkbox-btn v-model="task.done" color="grey"></v-checkbox-btn>
                </v-list-item-action>
                <v-list-item-title>
                  <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.text }}</span>
                </v-list-item-title>
                <v-list-item-action>
                  <v-btn icon @click="editTask(task)"><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn icon @click="deleteTask(task)"><v-icon>mdi-delete</v-icon></v-btn>
                </v-list-item-action>
              </template>
              <template v-else>
                <v-list-item-action>
                  <v-text-field v-model="task.text" solo flat dense @keydown.enter="saveTask(task)" ref="editedTask" :value="task.text"></v-text-field>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon @click="saveTask(task)"><v-icon>mdi-check</v-icon></v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon @click="cancelEdit(task)"><v-icon>mdi-close</v-icon></v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-container>
  </template>
  
<script>
  import { computed } from 'vue'
  import { useAppStore } from '@/stores/app.js'
  
  export default {
    setup() {
      const appStore = useAppStore()
  
      const tasks = computed(() => appStore.tasks)
      const completedTasks = computed(() => tasks.value.filter(task => task.done).length)
      const progress = computed(() => (completedTasks.value / tasks.value.length) * 100)
      const remainingTasks = computed(() => tasks.value.length - completedTasks.value)
  
      function editTask(task) {
        task.editMode = true
        setTimeout(() => {
          task.$refs.editedTask.focus()
        })
      }
  
      function saveTask(task) {
        task.editMode = false
        appStore.updateTask(task)
      }
  
      function cancelEdit(task) {
        task.editMode = false
      }
  
      function deleteTask(task) {
        appStore.deleteTask(task)
      }
  
      return {
        tasks,
        completedTasks,
        progress,
        remainingTasks,
        editTask,
        saveTask,
        cancelEdit,
        deleteTask
      }
    }
  }
</script>