<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTool, relatedTools } from '../data/tools'
import { setHead } from '../utils/head'

const props = defineProps({
  slug: { type: String, required: true },
})

const route = useRoute()
const tool = computed(() => getTool(props.slug))
const related = computed(() => relatedTools(props.slug))

function applyHead() {
  const t = tool.value
  if (!t) return
  setHead({
    title: t.name,
    description: t.description,
    keywords: t.keywords,
    path: '/' + t.slug,
  })
}

onMounted(applyHead)
watch(() => route.fullPath, applyHead)
</script>

<template>
  <article v-if="tool" class="tool-page">
    <nav class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span>/</span>
      <span>{{ tool.name }}</span>
    </nav>

    <header class="tool-head">
      <h1>{{ tool.name }}</h1>
      <p class="tool-desc">{{ tool.description }}</p>
    </header>

    <section class="tool-body card">
      <slot />
    </section>

    <section v-if="$slots.faq" class="tool-faq">
      <h2>Frequently asked questions</h2>
      <slot name="faq" />
    </section>

    <aside class="related">
      <h2>Related tools</h2>
      <ul class="related-list">
        <li v-for="r in related" :key="r.slug">
          <RouterLink :to="'/' + r.slug">{{ r.name }}</RouterLink>
          <span class="related-short">{{ r.short }}</span>
        </li>
      </ul>
    </aside>
  </article>

  <p v-else>Tool not found.</p>
</template>
