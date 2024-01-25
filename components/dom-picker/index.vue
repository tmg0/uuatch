<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useElementBounding, useElementByPoint, useEventListener, useMouse, useTextSelection, watchDebounced } from '@vueuse/core'

const props = defineProps<{ document?: ShadowRoot }>()

const emit = defineEmits<{ select:({ element: HTMLElement, text: string }) => void }>()

const { x, y } = useMouse({ type: 'client' })
const { element, pause, resume } = useElementByPoint({ x, y, document: props.document })
const bounding = reactive(useElementBounding(element))
const { text } = useTextSelection()

watchDebounced(text, (value) => { value ? onSelect() : resume() }, { debounce: 500, maxWait: 1000 })

useEventListener('scroll', bounding.update, true)

const boxStyles = computed(() => {
  if (element.value) {
    return {
      display: 'block',
      width: `${bounding.width}px`,
      height: `${bounding.height}px`,
      left: `${bounding.left}px`,
      top: `${bounding.top}px`,
      backgroundColor: '#3eaf7c44',
      transition: 'all 0.05s linear'
    } as Record<string, string | number>
  }
  return {
    display: 'none'
  }
})

const onSelect = () => {
  emit('select', { element: unref(element), text: unref(text) })
  pause()
}
</script>

<template>
  <div :style="boxStyles" class="fixed pointer-events-none z-9999 border" @click.prevent="onSelect" />
</template>
