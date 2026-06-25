<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const input = ref('')
const output = ref('')
const error = ref('')

// UTF-8 safe Base64 helpers (btoa/atob alone break on multi-byte characters).
function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary)
}

function decodeBase64(b64) {
  const binary = atob(b64.trim())
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function encode() {
  error.value = ''
  try {
    output.value = encodeBase64(input.value)
  } catch (e) {
    output.value = ''
    error.value = e.message
  }
}

function decode() {
  error.value = ''
  try {
    output.value = decodeBase64(input.value)
  } catch {
    output.value = ''
    error.value = 'Invalid Base64 input.'
  }
}

function swap() {
  input.value = output.value
  output.value = ''
  error.value = ''
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
}
</script>

<template>
  <ToolLayout slug="base64-encode-decode">
    <div class="controls">
      <button class="btn" @click="encode">Encode</button>
      <button class="btn btn-secondary" @click="decode">Decode</button>
      <button class="btn btn-ghost btn-sm" @click="swap">Swap</button>
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <div class="io-grid">
      <div>
        <label class="label">Input</label>
        <textarea v-model="input" placeholder="Hello, 世界!" spellcheck="false"></textarea>
      </div>
      <div>
        <div class="io-head">
          <label class="label" style="margin: 0">Output</label>
          <CopyButton :text="output" />
        </div>
        <textarea :value="output" readonly placeholder="Result appears here" spellcheck="false"></textarea>
      </div>
    </div>

    <p v-if="error" class="alert alert-error">{{ error }}</p>
    <p class="hint">Full UTF-8 / Unicode support — emoji and non-Latin scripts encode and decode correctly.</p>

    <template #faq>
      <h3>Does this support Unicode?</h3>
      <p>Yes. The encoder converts text to UTF-8 bytes first, so characters like 世界 or 😀 round-trip correctly.</p>
      <h3>Is Base64 encryption?</h3>
      <p>No. Base64 is an encoding, not encryption. Anyone can decode it — never use it to protect secrets.</p>
    </template>
  </ToolLayout>
</template>
