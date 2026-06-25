<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const input = ref('')
const output = ref('')
const error = ref('')

function encode() {
  error.value = ''
  const ta = document.createElement('textarea')
  ta.textContent = input.value
  output.value = ta.innerHTML
}

function decode() {
  error.value = ''
  const ta = document.createElement('textarea')
  ta.innerHTML = input.value
  output.value = ta.value
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
  <ToolLayout slug="html-encode-decode">
    <div class="controls">
      <button class="btn" @click="encode">Encode</button>
      <button class="btn btn-secondary" @click="decode">Decode</button>
      <button class="btn btn-ghost btn-sm" @click="swap">Swap</button>
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <div class="io-grid">
      <div>
        <label class="label">Input</label>
        <textarea v-model="input" placeholder='Hello <world> & "quotes"' spellcheck="false"></textarea>
      </div>
      <div>
        <div class="io-head">
          <label class="label" style="margin: 0">Output</label>
          <CopyButton :text="output" />
        </div>
        <textarea :value="output" readonly spellcheck="false"></textarea>
      </div>
    </div>

    <p v-if="error" class="alert alert-error">{{ error }}</p>
    <p class="hint">Encodes <code>&lt; &gt; &amp; " '</code> to HTML entities and back.</p>

    <template #faq>
      <h3>Encode or escape?</h3>
      <p>"Encode" converts special characters to entities like <code>&amp;lt;</code>. "Decode" reverses the process.</p>
    </template>
  </ToolLayout>
</template>
