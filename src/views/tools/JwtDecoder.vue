<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const token = ref('')
const error = ref('')
const header = ref(null)
const payload = ref(null)

function b64urlDecode(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = s.length % 4
  if (pad) s += '='.repeat(4 - pad)
  const binary = atob(s)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function decode() {
  error.value = ''
  header.value = null
  payload.value = null

  const parts = token.value.trim().split('.')
  if (parts.length < 2) {
    error.value = 'A JWT must have at least header and payload segments (header.payload.signature).'
    return
  }

  try {
    header.value = JSON.parse(b64urlDecode(parts[0]))
    payload.value = JSON.parse(b64urlDecode(parts[1]))
  } catch {
    error.value = 'Could not decode JWT. Check that header and payload are valid Base64URL JSON.'
  }
}

function clearAll() {
  token.value = ''
  header.value = null
  payload.value = null
  error.value = ''
}

const pretty = (obj) => (obj ? JSON.stringify(obj, null, 2) : '')
</script>

<template>
  <ToolLayout slug="jwt-decoder">
    <div class="field">
      <label class="label">JWT token</label>
      <textarea
        v-model="token"
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        spellcheck="false"
        rows="4"
      ></textarea>
    </div>

    <div class="controls">
      <button class="btn" @click="decode">Decode</button>
      <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
    </div>

    <p v-if="error" class="alert alert-error">{{ error }}</p>

    <div v-if="header" class="io-grid" style="margin-top: 12px">
      <div>
        <div class="io-head">
          <label class="label" style="margin: 0">Header</label>
          <CopyButton :text="pretty(header)" />
        </div>
        <pre class="result" style="background: #f8fafc; color: var(--ink); border: 1px solid var(--line)">{{ pretty(header) }}</pre>
      </div>
      <div>
        <div class="io-head">
          <label class="label" style="margin: 0">Payload</label>
          <CopyButton :text="pretty(payload)" />
        </div>
        <pre class="result" style="background: #f8fafc; color: var(--ink); border: 1px solid var(--line)">{{ pretty(payload) }}</pre>
      </div>
    </div>

    <p class="hint">Decode only — signature is <strong>not</strong> verified. Never paste production secrets on untrusted sites.</p>

    <template #faq>
      <h3>Is the signature verified?</h3>
      <p>No. This tool only Base64URL-decodes the header and payload for inspection. Signature verification requires your secret key.</p>
      <h3>Is it safe to paste my JWT here?</h3>
      <p>Decoding happens locally in your browser, but avoid pasting tokens with sensitive claims on any third-party site.</p>
    </template>
  </ToolLayout>
</template>
