<script lang="ts" setup>
interface DOMSelectEvent {
  element: HTMLElement
  text: string
}

const url = ref('')
const html = ref('')
const shadowRoot = ref()

const onPreviewURL = async () => {
  const { data } = await useFetch<string>(`/api/foci/${0}/sources`, { method: 'POST', body: { url } })
  html.value = data.value ?? ''
}

const onSelectDOM = ({ element, text }: DOMSelectEvent) => {
  console.log(element)
  console.log(text)
}
</script>

<template>
  <div class="flex h-full w-full">
    <div class="flex-1">
      <input v-model="url">
      <button @click="onPreviewURL">
        go
      </button>
    </div>

    <div class="flex-1">
      <DomPicker v-if="shadowRoot" :document="shadowRoot" @select="onSelectDOM" />
      <ShadowDom v-model:shadow-root="shadowRoot" :html="html" />
    </div>
  </div>
</template>
