<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useElementBounding, useElementByPoint, useEventListener, useMouse, useTextSelection, watchDebounced  } from '@vueuse/core'

const { x, y } = useMouse({ type: 'client' })
const { element, pause, resume } = useElementByPoint({ x, y })
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
      transition: 'all 0.05s linear',
    } as Record<string, string | number>
  }
  return {
    display: 'none',
  }
})

const pointStyles = computed<Record<string, string | number>>(() => ({
  transform: `translate(calc(${x.value}px - 50%), calc(${y.value}px - 50%))`,
}))

const onSelect = () => {
  pause()
  console.log(element.value)
  console.log(text.value)
}
</script>

<template>
  <div :style="boxStyles" class="fixed pointer-events-none z-9999 border" @click.prevent="onSelect" />
  <div :style="pointStyles" class="fixed top-0 left-0 pointer-events-none w-2 h-2 rounded-full bg-green-400 shadow z-999" />
</template>