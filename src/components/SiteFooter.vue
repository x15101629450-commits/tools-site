<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>&copy; {{ year }} DevTools. All tools run locally in your browser.</p>
      <nav class="footer-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/privacy">Privacy</RouterLink>
      </nav>
    </div>
  </footer>
</template>
