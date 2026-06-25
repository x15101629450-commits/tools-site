<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const length = ref(16)
const count = ref(1)
const useUpper = ref(true)
const useLower = ref(true)
const useDigits = ref(true)
const useSymbols = ref(true)
const password = ref('')

const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

function generateOne() {
  let chars = ''
  if (useUpper.value) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (useLower.value) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (useDigits.value) chars += '0123456789'
  if (useSymbols.value) chars += SYMBOLS
  if (!chars) return ''

  const arr = crypto.getRandomValues(new Uint32Array(Number(length.value)))
  return Array.from(arr, (n) => chars[n % chars.length]).join('')
}

function generate() {
  const n = Math.min(Math.max(Number(count.value) || 1, 1), 20)
  password.value = Array.from({ length: n }, () => generateOne()).join('\n')
}

function clearAll() {
  password.value = ''
}
</script>

<template>
  <ToolLayout slug="password-generator">
    <div class="io-grid">
      <div>
        <label class="label">Length</label>
        <input v-model.number="length" type="number" min="4" max="128" />
      </div>
      <div>
        <label class="label">Count</label>
        <input v-model.number="count" type="number" min="1" max="20" />
      </div>
    </div>

    <div class="controls" style="margin-top: 12px">
      <label><input type="checkbox" v-model="useUpper" style="width: auto" /> A-Z</label>
      <label><input type="checkbox" v-model="useLower" style="width: auto" /> a-z</label>
      <label><input type="checkbox" v-model="useDigits" style="width: auto" /> 0-9</label>
      <label><input type="checkbox" v-model="useSymbols" style="width: auto" /> Symbols</label>
    </div>

    <div class="controls">
      <button class="btn" @click="generate">Generate</button>
      <CopyButton :text="password" label="Copy" />
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <div v-if="password" class="field">
      <textarea :value="password" readonly rows="4" spellcheck="false" class="mono"></textarea>
    </div>

    <p class="hint">Uses crypto.getRandomValues() for cryptographically strong randomness.</p>

    <template #faq>
      <h3>How long should a password be?</h3>
      <p>For most accounts, 16+ characters with mixed character types is a good baseline.</p>
    </template>
  </ToolLayout>
</template>
