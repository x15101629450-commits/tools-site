<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const list = ref('')
const version = ref('v4')
const count = ref(5)

function generateOne() {
  if (version.value === 'v4') {
    return crypto.randomUUID()
  }
  // UUID v7-ish: time-ordered (simplified, good enough for dev tools)
  const ts = Date.now()
  const bytes = crypto.getRandomValues(new Uint8Array(10))
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
  const timeHex = ts.toString(16).padStart(12, '0')
  return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-7${hex.slice(0, 3)}-${hex.slice(3, 7)}-${hex.slice(7, 19)}`
}

function generate() {
  const n = Math.min(Math.max(Number(count.value) || 1, 1), 100)
  list.value = Array.from({ length: n }, () => generateOne()).join('\n')
}

function clearAll() {
  list.value = ''
}
</script>

<template>
  <ToolLayout slug="uuid-generator">
    <div class="controls">
      <label class="label" style="margin: 0">Count</label>
      <input v-model.number="count" type="number" min="1" max="100" style="width: 80px" />
      <select v-model="version" style="width: auto">
        <option value="v4">UUID v4 (random)</option>
        <option value="v7">UUID v7 (time-ordered)</option>
      </select>
      <button class="btn" @click="generate">Generate</button>
      <CopyButton :text="list" label="Copy all" />
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <div v-if="list" class="field">
      <textarea :value="list" readonly rows="8" spellcheck="false"></textarea>
    </div>

    <p class="hint">Uses crypto.randomUUID() for v4. Nothing is sent to a server.</p>

    <template #faq>
      <h3>What is UUID v4?</h3>
      <p>A 128-bit random identifier, commonly used as database primary keys and correlation IDs.</p>
      <h3>What is UUID v7?</h3>
      <p>A time-ordered UUID that sorts chronologically — useful for database indexes.</p>
    </template>
  </ToolLayout>
</template>
