<script setup>
import { ref } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz'

const value = ref('')
const fromBase = ref('10')
const error = ref('')
const results = ref(null)

function parseToBigInt(str, base) {
  let s = str.trim().toLowerCase()
  if (!s) throw new Error('empty')
  let neg = false
  if (s[0] === '-') {
    neg = true
    s = s.slice(1)
  } else if (s[0] === '+') {
    s = s.slice(1)
  }
  if (!s) throw new Error('empty')
  const b = BigInt(base)
  let result = 0n
  for (const ch of s) {
    const d = DIGITS.indexOf(ch)
    if (d < 0 || d >= base) {
      throw new Error(`"${ch}" is not a valid digit for base ${base}`)
    }
    result = result * b + BigInt(d)
  }
  return neg ? -result : result
}

function toBase(num, base) {
  if (num === 0n) return '0'
  let neg = num < 0n
  if (neg) num = -num
  const b = BigInt(base)
  let out = ''
  while (num > 0n) {
    out = DIGITS[Number(num % b)] + out
    num /= b
  }
  return (neg ? '-' : '') + out
}

function convert() {
  error.value = ''
  results.value = null
  try {
    const n = parseToBigInt(value.value, Number(fromBase.value))
    results.value = {
      bin: toBase(n, 2),
      oct: toBase(n, 8),
      dec: toBase(n, 10),
      hex: toBase(n, 16),
    }
  } catch (e) {
    error.value = e.message === 'empty' ? 'Enter a number to convert.' : e.message
  }
}

function clearAll() {
  value.value = ''
  results.value = null
  error.value = ''
}
</script>

<template>
  <ToolLayout slug="number-base-converter">
    <div class="controls">
      <div style="flex: 1; min-width: 200px">
        <label class="label">Number</label>
        <input type="text" v-model="value" placeholder="255" spellcheck="false" @keyup.enter="convert" />
      </div>
      <div>
        <label class="label">From base</label>
        <select v-model="fromBase" style="width: auto">
          <option value="2">Binary (2)</option>
          <option value="8">Octal (8)</option>
          <option value="10">Decimal (10)</option>
          <option value="16">Hex (16)</option>
        </select>
      </div>
      <div style="align-self: flex-end; display: flex; gap: 8px">
        <button class="btn" @click="convert">Convert</button>
        <button class="btn btn-ghost btn-sm" @click="clearAll">Clear</button>
      </div>
    </div>

    <p v-if="error" class="alert alert-error">{{ error }}</p>

    <table v-if="results" class="kv-table" style="margin-top: 12px">
      <tbody>
        <tr>
          <td>Binary (2)</td>
          <td><span class="mono">{{ results.bin }}</span></td>
          <td style="text-align: right; width: 70px"><CopyButton :text="results.bin" /></td>
        </tr>
        <tr>
          <td>Octal (8)</td>
          <td><span class="mono">{{ results.oct }}</span></td>
          <td style="text-align: right"><CopyButton :text="results.oct" /></td>
        </tr>
        <tr>
          <td>Decimal (10)</td>
          <td><span class="mono">{{ results.dec }}</span></td>
          <td style="text-align: right"><CopyButton :text="results.dec" /></td>
        </tr>
        <tr>
          <td>Hex (16)</td>
          <td><span class="mono">{{ results.hex }}</span></td>
          <td style="text-align: right"><CopyButton :text="results.hex" /></td>
        </tr>
      </tbody>
    </table>

    <p class="hint">Uses BigInt internally, so arbitrarily large integers convert without precision loss.</p>

    <template #faq>
      <h3>Can it handle very large numbers?</h3>
      <p>Yes. Conversion is done with JavaScript BigInt, so there is no 2^53 precision limit like with regular numbers.</p>
      <h3>Are hex letters case-sensitive?</h3>
      <p>No. Input such as <code>FF</code> and <code>ff</code> are treated the same; output is lowercase.</p>
    </template>
  </ToolLayout>
</template>
