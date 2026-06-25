<script setup>
import { ref, computed, watch } from 'vue'
import JsonTree from './JsonTree.vue'
import CopyButton from './CopyButton.vue'

const SAMPLE =
  '{\n  "name": "DevTools",\n  "version": 2,\n  "open_source": true,\n  "tools": ["json", "base64", "hash"],\n  "meta": { "stars": 1280, "license": null }\n}'

const props = defineProps({
  initial: { type: String, default: '' },
})

const input = ref(props.initial || SAMPLE)
const parsed = ref(null)
const error = ref('')
const view = ref('tree') // 'tree' | 'text'
const indent = ref(2)

function parse() {
  if (!input.value.trim()) {
    parsed.value = null
    error.value = ''
    return
  }
  try {
    parsed.value = JSON.parse(input.value)
    error.value = ''
  } catch (e) {
    error.value = e.message
  }
}

watch(input, parse, { immediate: true })

const valid = computed(() => !error.value && input.value.trim().length > 0)
const formatted = computed(() =>
  valid.value ? JSON.stringify(parsed.value, null, indent.value) : ''
)

function format() {
  if (valid.value) input.value = JSON.stringify(parsed.value, null, indent.value)
}
function minify() {
  if (valid.value) input.value = JSON.stringify(parsed.value)
}
function loadSample() {
  input.value = SAMPLE
}
function clearAll() {
  input.value = ''
}
</script>

<template>
  <div class="editor">
    <div class="editor-toolbar">
      <button class="btn btn-sm" @click="format">Format</button>
      <button class="btn btn-secondary btn-sm" @click="minify">Minify</button>
      <select v-model.number="indent" style="width: auto; padding: 5px 8px; font-size: 12.5px">
        <option :value="2">2 spaces</option>
        <option :value="4">4 spaces</option>
      </select>
      <button class="btn btn-ghost btn-sm" @click="loadSample">Sample</button>
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>

      <span class="spacer"></span>

      <span v-if="input.trim()" class="status" :class="valid ? 'ok' : 'err'">
        {{ valid ? '● Valid JSON' : '● Invalid' }}
      </span>
      <span class="seg">
        <button :class="{ active: view === 'tree' }" @click="view = 'tree'">Tree</button>
        <button :class="{ active: view === 'text' }" @click="view = 'text'">Text</button>
      </span>
    </div>

    <div class="editor-panes">
      <div class="pane">
        <div class="pane-head">
          <span>Input</span>
        </div>
        <textarea
          v-model="input"
          class="editor-input"
          spellcheck="false"
          placeholder='Paste JSON here, e.g. {"hello":"world"}'
        ></textarea>
      </div>

      <div class="pane">
        <div class="pane-head">
          <span>{{ view === 'tree' ? 'Tree view' : 'Formatted' }}</span>
          <CopyButton :text="formatted" />
        </div>
        <div class="editor-output">
          <p v-if="error && input.trim()" class="alert alert-error" style="margin-top: 0">{{ error }}</p>
          <p v-else-if="!input.trim()" class="jt-empty">Enter JSON to see the parsed result.</p>
          <div v-else-if="view === 'tree'" class="json-tree">
            <JsonTree :data="parsed" :last="true" />
          </div>
          <pre v-else class="json-tree" style="white-space: pre-wrap; word-break: break-word">{{ formatted }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
