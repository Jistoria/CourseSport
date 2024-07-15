<script setup>
import {RouterLink} from 'vue-router'
</script>


<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" alt="Bootstrap" width="50" height="50">
    </a>    
 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex flex-grow-1  justify-content-end">
                      <ul class="navbar-nav ">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Cursos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Deportes</a>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'login'}">
              <a class="nav-link active" aria-current="page" href="#">Iniciar Sesion</a>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Registro</a>
            </li>
          </ul> 
        </div>
    </div>
  </div>
  
</nav>

</template>
<style scoped>

</style>