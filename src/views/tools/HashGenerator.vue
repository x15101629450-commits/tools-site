<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

const input = ref('')
const error = ref('')
const results = ref(null)

async function sha(algo, str) {
  const data = new TextEncoder().encode(str)
  const buf = await crypto.subtle.digest(algo, data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function generate() {
  error.value = ''
  results.value = null
  try {
    const entries = await Promise.all(ALGOS.map(async (a) => [a, await sha(a, input.value)]))
    results.value = entries
  } catch (e) {
    error.value = e.message || 'Hashing failed. Web Crypto requires a secure context (https or localhost).'
  }
}

function clearAll() {
  input.value = ''
  results.value = null
  error.value = ''
}
</script>

<template>
  <ToolLayout slug="hash-generator">
    <div class="field">
      <label class="label">Text to hash</label>
      <textarea v-model="input" placeholder="Type or paste any text" spellcheck="false"></textarea>
    </div>
    <div class="controls">
      <button class="btn" @click="generate">Generate hashes</button>
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <p v-if="error" class="alert alert-error">{{ error }}</p>

    <table v-if="results" class="kv-table" style="margin-top: 12px">
      <tbody>
        <tr v-for="[algo, hash] in results" :key="algo">
          <td>{{ algo }}</td>
          <td><span class="mono">{{ hash }}</span></td>
          <td style="text-align: right; width: 70px"><CopyButton :text="hash" /></td>
        </tr>
      </tbody>
    </table>

    <p class="hint">Hashes are computed with the browser's native Web Crypto API. Nothing is uploaded. For MD5, use the <RouterLink to="/md5-generator">MD5 Generator</RouterLink> tool.</p>

    <template #faq>
      <h3>Where is MD5?</h3>
      <p>MD5 is available as a separate <RouterLink to="/md5-generator">MD5 Generator</RouterLink> tool. SHA hashes here use the Web Crypto API for stronger algorithms.</p>
      <h3>Why does it say "secure context"?</h3>
      <p>Web Crypto's digest function only runs over HTTPS or on localhost. It will work on your deployed site and during local development.</p>
    </template>
  </ToolLayout>
</template>
