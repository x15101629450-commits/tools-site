<script setup>
import { ref, watch } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const hex = ref('#2563eb')
const rgb = ref('37, 99, 235')
const error = ref('')
const preview = ref('#2563eb')

function parseHex(h) {
  let s = h.trim().replace(/^#/, '')
  if (s.length === 3) s = s.split('').map((c) => c + c).join('')
  if (!/^[0-9a-fA-F]{6}$/.test(s)) throw new Error('Invalid hex color (use #RRGGBB or #RGB).')
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  }
}

function fromHex() {
  error.value = ''
  try {
    const { r, g, b } = parseHex(hex.value)
    rgb.value = `${r}, ${g}, ${b}`
    preview.value = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  } catch (e) {
    error.value = e.message
  }
}

function fromRgb() {
  error.value = ''
  const parts = rgb.value.split(/[,\s]+/).filter(Boolean).map(Number)
  if (parts.length !== 3 || parts.some((n) => isNaN(n) || n < 0 || n > 255)) {
    error.value = 'Enter three numbers 0–255, e.g. 37, 99, 235'
    return
  }
  const [r, g, b] = parts
  hex.value =
    '#' +
    [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')
  preview.value = hex.value
}

watch(hex, fromHex)
</script>

<template>
  <ToolLayout slug="color-converter">
    <div class="io-grid">
      <div>
        <label class="label">HEX</label>
        <input v-model="hex" type="text" placeholder="#2563eb" spellcheck="false" />
      </div>
      <div>
        <label class="label">RGB</label>
        <input v-model="rgb" type="text" placeholder="37, 99, 235" spellcheck="false" @change="fromRgb" />
      </div>
    </div>

    <div class="controls">
      <button class="btn btn-secondary" @click="fromRgb">RGB → HEX</button>
      <CopyButton :text="hex" label="Copy HEX" />
      <CopyButton :text="`rgb(${rgb})`" label="Copy rgb()" />
    </div>

    <p v-if="error" class="alert alert-error">{{ error }}</p>

    <div
      style="margin-top: 16px; height: 64px; border-radius: 8px; border: 1px solid var(--line)"
      :style="{ background: preview }"
    ></div>

    <template #faq>
      <h3>Does it support shorthand hex?</h3>
      <p>Yes. Three-digit shorthand like <code>#f00</code> expands to <code>#ff0000</code>.</p>
    </template>
  </ToolLayout>
</template>
