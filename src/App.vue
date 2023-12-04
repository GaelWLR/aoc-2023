<script setup lang="ts">
import { RouterView } from 'vue-router';

type NavLink = {
  to: { name: string; params?: Record<string, string | number> };
  label: string;
};

const dayNavLinks: NavLink[] = Array.from({ length: 2 }, (_, i) => i + 1).map((i) => ({
  to: { name: `day-${i}` },
  label: `Day ${i}`,
}));

const navLinks: NavLink[] = [{ to: { name: 'home' }, label: 'Home' }, ...dayNavLinks];
</script>

<template>
  <header>
    <h1>Advent of Code</h1>
  </header>

  <nav>
    <ul>
      <li v-for="link in navLinks" :key="link.to.name">
        <router-link :to="link.to">[{{ link.label }}]</router-link>
      </li>
    </ul>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header > h1 {
  color: var(--color-title);
}

nav {
  display: flex;
  justify-content: center;
}

nav > ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

nav > ul > li {
  margin: 0 0.5rem;
}

nav > ul > li > a {
  color: var(--color-link);
  text-decoration: none;
}

nav > ul > li > a:hover {
  text-shadow: 0 0 0.5rem var(--color-link);
}
</style>
