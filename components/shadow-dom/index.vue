<script setup lang="ts">
const props = defineProps<{ html: string }>()

const domRef = ref<HTMLElement>()

watch(() => props.html, async (value) => {
  await nextTick()
  if (!value || !domRef.value) { return }
  const shadowRoot = domRef.value.shadowRoot ?? domRef.value.attachShadow({ mode: 'open' })
  shadowRoot.innerHTML = props.html
}, { immediate: true })
</script>

<template>
  <div ref="domRef"></div>
</template>