<script setup lang="ts">
interface Props {
  html: string
  shadowRoot?: ShadowRoot
}

let _shadowRoot: ShadowRoot

const props = defineProps<Props>()
const emit = defineEmits(['update:shadowRoot'])

const domRef = ref<HTMLElement>()

watch(() => props.html, async (value) => {
  if (!value) { return }
  await nextTick()
  if (!domRef.value) { return }
  _shadowRoot = domRef.value.shadowRoot ?? domRef.value.attachShadow({ mode: 'open' })
  _shadowRoot.innerHTML = value
  emit('update:shadowRoot', _shadowRoot)
}, { immediate: true })
</script>

<template>
  <div ref="domRef" />
</template>
