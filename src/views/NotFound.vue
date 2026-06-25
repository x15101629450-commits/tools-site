<script setup>
import { onMounted } from 'vue'
import { setHead } from '../utils/head'

onMounted(() => {
  setHead({ title: 'Page not found', description: 'The page you are looking for does not exist.', path: '/404' })
})
</script>

<template>
  <div class="center">
    <h1>404</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <p style="margin-top: 16px">
      <RouterLink to="/" class="btn">Back to all tools</RouterLink>
    </p>
  </div>
</template>
