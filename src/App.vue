<script setup>
import Header from './pages/header.vue'
import Footer from './pages/footer.vue'
import Activity from './pages/activity.vue'

</script>

<template>
 <Activity />
  <header>
    <Header />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */

</style>
