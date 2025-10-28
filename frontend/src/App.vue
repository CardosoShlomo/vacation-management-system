<template>
  <div>
    <nav>
      <RouterLink to="/requester">Requester</RouterLink>
      <RouterLink to="/validator">Validator</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
nav {
  padding: 1rem;
  background: #333;
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

nav a.router-link-active {
  background: #42b983;
  border-radius: 4px;
}
</style>
