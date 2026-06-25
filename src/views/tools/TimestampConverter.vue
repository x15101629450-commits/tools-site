<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'

const now = ref(Math.floor(Date.now() / 1000))
let timer = null

const tsInput = ref('')
const tsError = ref('')
const tsResult = ref(null)

const dateInput = ref('')
const dateError = ref('')
const dateResult = ref(null)

function fromTimestamp() {
  tsError.value = ''
  tsResult.value = null
  const raw = tsInput.value.trim()
  if (!raw || !/^\d+$/.test(raw)) {
    tsError.value = 'Enter a numeric Unix timestamp (seconds or milliseconds).'
    return
  }
  // Treat values with 13+ digits as milliseconds.
  const ms = raw.length >= 13 ? Number(raw) : Number(raw) * 1000
  const d = new Date(ms)
  if (isNaN(d.getTime())) {
    tsError.value = 'That timestamp is out of range.'
    return
  }
  tsResult.value = {
    utc: d.toUTCString(),
    local: d.toString(),
    iso: d.toISOString(),
  }
}

function fromDate() {
  dateError.value = ''
  dateResult.value = null
  if (!dateInput.value) {
    dateError.value = 'Pick a date and time.'
    return
  }
  const d = new Date(dateInput.value)
  if (isNaN(d.getTime())) {
    dateError.value = 'Invalid date.'
    return
  }
  dateResult.value = {
    seconds: Math.floor(d.getTime() / 1000),
    millis: d.getTime(),
  }
}

function useNow() {
  tsInput.value = String(now.value)
  fromTimestamp()
}

onMounted(() => {
  timer = setInterval(() => (now.value = Math.floor(Date.now() / 1000)), 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <ToolLayout slug="unix-timestamp-converter">
    <div class="field" style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap">
      <span class="label" style="margin: 0">Current Unix time:</span>
      <span class="mono" style="font-size: 16px; font-weight: 700">{{ now }}</span>
      <CopyButton :text="String(now)" />
    </div>

    <hr style="border: none; border-top: 1px solid var(--line); margin: 16px 0" />

    <h2>Timestamp → Date</h2>
    <div class="controls">
      <div style="flex: 1; min-width: 200px">
        <input type="text" v-model="tsInput" placeholder="1700000000" spellcheck="false" @keyup.enter="fromTimestamp" />
      </div>
      <button class="btn" @click="fromTimestamp">Convert</button>
      <button class="btn btn-ghost btn-sm" @click="useNow">Use now</button>
    </div>
    <p v-if="tsError" class="alert alert-error">{{ tsError }}</p>
    <table v-if="tsResult" class="kv-table">
      <tbody>
        <tr><td>UTC</td><td><span class="mono">{{ tsResult.utc }}</span></td></tr>
        <tr><td>Local</td><td><span class="mono">{{ tsResult.local }}</span></td></tr>
        <tr><td>ISO 8601</td><td><span class="mono">{{ tsResult.iso }}</span></td></tr>
      </tbody>
    </table>

    <hr style="border: none; border-top: 1px solid var(--line); margin: 20px 0" />

    <h2>Date → Timestamp</h2>
    <div class="controls">
      <input type="datetime-local" v-model="dateInput" step="1" style="width: auto" />
      <button class="btn" @click="fromDate">Convert</button>
    </div>
    <p v-if="dateError" class="alert alert-error">{{ dateError }}</p>
    <table v-if="dateResult" class="kv-table">
      <tbody>
        <tr>
          <td>Seconds</td>
          <td><span class="mono">{{ dateResult.seconds }}</span></td>
          <td style="text-align: right; width: 70px"><CopyButton :text="String(dateResult.seconds)" /></td>
        </tr>
        <tr>
          <td>Milliseconds</td>
          <td><span class="mono">{{ dateResult.millis }}</span></td>
          <td style="text-align: right"><CopyButton :text="String(dateResult.millis)" /></td>
        </tr>
      </tbody>
    </table>

    <template #faq>
      <h3>Seconds or milliseconds?</h3>
      <p>Unix timestamps are usually in seconds. Inputs with 13 or more digits are treated as milliseconds.</p>
      <h3>Which time zone is used?</h3>
      <p>Results are shown in both UTC and your browser's local time zone.</p>
    </template>
  </ToolLayout>
</template>
