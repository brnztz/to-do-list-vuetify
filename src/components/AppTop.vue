<template>
    <v-toolbar app color="secondary" dark>
        <v-toolbar-title>
            <v-icon>mdi-text-box-check</v-icon>
            TO DO LIST
        </v-toolbar-title>

        <v-spacer />
        <v-btn to="/lista">
            Lista de Atividades
            <v-icon>mdi-format-list-checkbox</v-icon>
        </v-btn>
        <v-btn to="/cadastro" class="ml-2">
            Adicionar Atividade
            <v-icon>mdi-plus</v-icon>
        </v-btn>

    </v-toolbar>
</template>

<script setup>

</script>

<style scoped lang="sass">
    .social-link :deep(.v-icon)
      color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
      text-decoration: none
      transition: .2s ease-in-out
  
      &:hover
        color: rgba(25, 118, 210, 1)
  </style>