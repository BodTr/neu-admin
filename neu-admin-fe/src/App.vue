<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <RouterView />
</template>

<style>

.VueTables__search__input {
  width: 200px;
  margin: 10px
}

.VueTables__search-field label {
  float: left;
  margin: 5px
}
@media (min-width: 1400px){
  .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    max-width: 100% !important;
  }
}
.page-title{
  color: white !important;
}
.container-tight{
  width: 500px !important;
}
.card{
  border-radius: 10px;
}
.VueTables.VueTables--server{
  padding: 15px;
}
.VuePagination__count{
  margin-top: 15px;
}
</style>
