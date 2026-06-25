<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {},
  name: { type: String, default: null },
  depth: { type: Number, default: 0 },
  last: { type: Boolean, default: true },
})

const open = ref(props.depth < 4)

const type = computed(() => {
  if (props.data === null) return 'null'
  if (Array.isArray(props.data)) return 'array'
  return typeof props.data
})

const isContainer = computed(() => type.value === 'object' || type.value === 'array')
const openBracket = computed(() => (type.value === 'array' ? '[' : '{'))
const closeBracket = computed(() => (type.value === 'array' ? ']' : '}'))

const entries = computed(() => {
  if (type.value === 'array') return props.data.map((v, i) => [i, v])
  if (type.value === 'object') return Object.entries(props.data)
  return []
})

// JSON.stringify gives correctly quoted/escaped primitive rendering.
const primitive = computed(() => JSON.stringify(props.data))

function toggle() {
  if (isContainer.value) open.value = !open.value
}
</script>

<template>
  <!-- Container: object / array -->
  <div v-if="isContainer" class="jt-node">
    <div class="jt-line clickable" @click="toggle">
      <span class="jt-toggle">{{ entries.length ? (open ? '▾' : '▸') : '' }}</span>
      <span v-if="name !== null"><span class="jt-key">"{{ name }}"</span><span class="jt-colon">: </span></span>
      <span class="jt-punct">{{ openBracket }}</span>
      <template v-if="!open || !entries.length">
        <span v-if="entries.length" class="jt-count">{{ entries.length }} {{ type === 'array' ? 'items' : 'keys' }}</span>
        <span class="jt-punct">{{ closeBracket }}</span><span v-if="!last" class="jt-punct">,</span>
      </template>
    </div>

    <template v-if="open && entries.length">
      <div class="jt-children">
        <JsonTree
          v-for="([k, v], idx) in entries"
          :key="k"
          :data="v"
          :name="type === 'object' ? String(k) : null"
          :depth="depth + 1"
          :last="idx === entries.length - 1"
        />
      </div>
      <div class="jt-line">
        <span class="jt-toggle"></span>
        <span class="jt-punct">{{ closeBracket }}</span><span v-if="!last" class="jt-punct">,</span>
      </div>
    </template>
  </div>

  <!-- Primitive -->
  <div v-else class="jt-line">
    <span class="jt-toggle"></span>
    <span v-if="name !== null"><span class="jt-key">"{{ name }}"</span><span class="jt-colon">: </span></span>
    <span :class="'jt-' + type">{{ primitive }}</span><span v-if="!last" class="jt-punct">,</span>
  </div>
</template>
