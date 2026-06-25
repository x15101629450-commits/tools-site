<script setup>
import { ref, computed } from 'vue'
import ToolLayout from '../../components/ToolLayout.vue'
import CopyButton from '../../components/CopyButton.vue'
import { CASE_TRANSFORMS } from '../../utils/textCase'

const input = ref('hello_world example-text')

const results = computed(() =>
  CASE_TRANSFORMS.map(({ id, label, fn }) => ({
    id,
    label,
    value: input.value ? fn(input.value) : '',
  }))
)
</script>

<template>
  <ToolLayout slug="case-converter">
    <div class="field">
      <label class="label">Input text</label>
      <input v-model="input" type="text" placeholder="hello_world example-text" spellcheck="false" />
    </div>

    <table v-if="input" class="kv-table" style="margin-top: 12px">
      <tbody>
        <tr v-for="r in results" :key="r.id">
          <td>{{ r.label }}</td>
          <td><span class="mono">{{ r.value }}</span></td>
          <td style="text-align: right; width: 70px"><CopyButton :text="r.value" /></td>
        </tr>
      </tbody>
    </table>

    <template #faq>
      <h3>What naming styles are supported?</h3>
      <p>camelCase, PascalCase, snake case, kebab-case, CONSTANT_CASE, Title Case, and basic upper/lower case.</p>
    </template>
  </ToolLayout>
</template>
