<script lang="ts" setup>
const html = ref('<div>inner shadow dom</div>')
</script>

<template>
  <div>
    <div>dom outside</div>
    <DomPicker />
    <ShadowDom :html="html" />
  </div>
</template>