// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    tasks: []
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },
    deleteTask(taskToDelete) {
      const index = this.tasks.findIndex(task => task.id === taskToDelete.id)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    }
  }
})
