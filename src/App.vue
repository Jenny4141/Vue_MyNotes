<script setup>
import ToolBar from './components/ToolBar.vue';
import NoteList from './components/NoteList.vue';

</script>

<template>
  <ToolBar/>
  <div class="d-flex">
    <NoteList/>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
