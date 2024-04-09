<template>
    <v-container style="max-width: 500px">
      <v-text-field
        v-model="newTask"
        label="Adicione um item a sua lista"
        variant="solo"
        @keydown.enter="create"
      >
        <template v-slot:append-inner>
          <v-fade-transition>
            <v-btn
              v-show="newTask"
              icon="mdi-plus-circle"
              variant="text"
              @click="create"
            ></v-btn>
          </v-fade-transition>
        </template>
      </v-text-field>
  
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'
  
  export default {
    setup() {
      const newTask = ref(null)
      const appStore = useAppStore()
      const snackbar = ref({ show: false, message: '', color: '' })
  
      function create() {
        // Verificar se newTask está vazio
        if (!newTask.value) {
          // Se estiver vazio, mostrar mensagem e retornar
          showSnackbar('Por favor, insira um item na lista', 'error')
          return
        }
        
        // Criar a tarefa apenas se newTask não estiver vazio
        const task = {
          done: false,
          text: newTask.value,
          editMode: false
        }
        appStore.addTask(task)
        newTask.value = null
        showSnackbar('Tarefa adicionada com sucesso', 'success')
      }
  
      function showSnackbar(message, color) {
        snackbar.value.message = message
        snackbar.value.color = color
        snackbar.value.show = true
      }
  
      return {
        newTask,
        create,
        snackbar
      }
    }
  }
  </script>
  