<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const input = ref('')
const output = ref('')
const error = ref('')
const wholeUri = ref(false)

function encode() {
  error.value = ''
  try {
    output.value = wholeUri.value ? encodeURI(input.value) : encodeURIComponent(input.value)
  } catch (e) {
    output.value = ''
    error.value = e.message
  }
}

function decode() {
  error.value = ''
  try {
    output.value = wholeUri.value ? decodeURI(input.value) : decodeURIComponent(input.value)
  } catch (e) {
    output.value = ''
    error.value = 'Could not decode: the input contains an invalid percent-encoded sequence.'
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
  <ToolLayout slug="url-encode-decode">
    <div class="controls">
      <button class="btn" @click="encode">Encode</button>
      <button class="btn btn-secondary" @click="decode">Decode</button>
      <button class="btn btn-ghost btn-sm" @click="swap">Swap</button>
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
      <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); margin-left: 6px">
        <input type="checkbox" v-model="wholeUri" style="width: auto" />
        Encode whole URI (keeps :/?&amp;=)
      </label>
    </div>

    <div class="io-grid">
      <div>
        <label class="label">Input</label>
        <textarea v-model="input" placeholder="https://example.com/search?q=hello world" spellcheck="false"></textarea>
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
    <p class="hint">
      "Encode" uses <code>encodeURIComponent</code> by default, which escapes characters like
      <code>/ ? &amp; =</code>. Enable "Encode whole URI" to use <code>encodeURI</code> instead, which
      preserves URL structure.
    </p>

    <template #faq>
      <h3>encodeURI vs encodeURIComponent?</h3>
      <p><code>encodeURIComponent</code> escapes a single value (e.g. a query parameter). <code>encodeURI</code> escapes a full URL but keeps structural characters intact.</p>
      <h3>Why does decoding fail?</h3>
      <p>Decoding throws when the input has a malformed percent sequence such as a lone <code>%</code> or <code>%ZZ</code>.</p>
    </template>
  </ToolLayout>
</template>
