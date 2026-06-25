<script setup>
import ToolLayout from '../../components/ToolLayout.vue'
import JsonEditor from '../../components/JsonEditor.vue'
</script>

<template>
  <ToolLayout slug="json-formatter">
    <JsonEditor />

    <template #faq>
      <h3>Is my JSON sent to a server?</h3>
      <p>No. Parsing, formatting and the tree view all run in your browser, so your data stays on your device.</p>
      <h3>What does the tree view show?</h3>
      <p>It renders your JSON as a collapsible, color-coded tree. Click any object or array to fold and unfold it.</p>
      <h3>What does "Minify" do?</h3>
      <p>It removes all unnecessary whitespace, producing the smallest valid JSON string.</p>
      <h3>Why did I get a parse error?</h3>
      <p>The input is not valid JSON. Common causes are trailing commas, single quotes instead of double quotes, or unquoted keys.</p>
    </template>
  </ToolLayout>
</template>
