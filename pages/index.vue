<script lang="ts" setup>
interface DOMSelectEvent {
  element: HTMLElement
  text: string
}

const url = ref('')
const html = ref('')
const shadowRoot = ref()

const onPreviewURL = async () => {
  const { data } = await useFetch<string>('/api/actions/dom', { query: { url } })
  html.value = data.value ?? ''
}

const onSelectDOM = ({ element, text }: DOMSelectEvent) => {
  console.log(element)
  console.log(text)
}
</script>

<template>
  <div class="flex h-full w-full">
    <div class="w-1/2">
      <UInput v-model="url" />
      <UButton @click="onPreviewURL">
        go ->
      </UButton>
    </div>

    <div class="w-1/2 h-full overflow-x-hidden overflow-y-auto">
      <DomPicker v-if="shadowRoot" :document="shadowRoot" @select="onSelectDOM" />
      <ShadowDom v-model:shadow-root="shadowRoot" :html="html" />
    </div>
  </div>
</template>
