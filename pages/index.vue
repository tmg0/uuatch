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
  const { xpath } = useXPath(element)
  console.log(xpath.value)
  console.log(text)
}
</script>

<template>
  <div class="w-full h-full p-6 bg-slate-300">
    <UCard class="h-full">
      <template #header>
        <div class="flex items-center gap-2">
          <UInput v-model="url" />
          <UButton @click="onPreviewURL">
            go ->
          </UButton>
        </div>
      </template>

      <div class="h-full overflow-auto">
        <DomPicker v-if="shadowRoot" :document="shadowRoot" @select="onSelectDOM" />
        <ShadowDom v-model:shadow-root="shadowRoot" :html="html" />
      </div>
    </UCard>
  </div>
</template>
