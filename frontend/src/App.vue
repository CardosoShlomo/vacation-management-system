<template>
  <div id="app">
    <nav>
      <div class="nav-content">
        <span class="nav-title">Vacation Management</span>
        <div class="nav-links">
          <RouterLink to="/requester">Requester</RouterLink>
          <RouterLink to="/validator">Validator</RouterLink>
        </div>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  background: #f8f9fa;
}

#app {
  min-height: 100vh;
}

nav {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

nav a.router-link-active {
  background: rgba(255, 255, 255, 0.3);
}

main {
  padding: 2rem 1rem;
  padding-top: 1rem;
}
</style>
