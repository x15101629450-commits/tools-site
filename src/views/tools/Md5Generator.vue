<script setup>
import { ref, watch } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'
import { md5 } from '../../utils/md5'

const input = ref('')
const hash = ref('')

function compute() {
  hash.value = input.value ? md5(input.value) : ''
}

watch(input, compute, { immediate: true })

function clearAll() {
  input.value = ''
}
</script>

<template>
  <ToolLayout slug="md5-generator">
    <div class="field">
      <label class="label">Text to hash</label>
      <textarea v-model="input" placeholder="Type or paste any text" spellcheck="false"></textarea>
    </div>

    <div v-if="hash" class="field">
      <div class="io-head">
        <label class="label" style="margin: 0">MD5 (32-char hex)</label>
        <CopyButton :text="hash" />
      </div>
      <div class="result" style="background: #f8fafc; color: var(--ink); border: 1px solid var(--line)">
        <span class="mono">{{ hash }}</span>
      </div>
    </div>

    <div class="controls">
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <p class="hint">Computed instantly in your browser. MD5 is for checksums only — do not use it for passwords or security.</p>

    <template #faq>
      <h3>Is MD5 secure?</h3>
      <p>No. MD5 is cryptographically broken and should not be used for password storage or digital signatures. It is still useful for file checksums and legacy API compatibility.</p>
      <h3>Is my data uploaded?</h3>
      <p>No. Hashing runs entirely in your browser.</p>
    </template>
  </ToolLayout>
</template>
