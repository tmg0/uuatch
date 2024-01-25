<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useElementBounding, useElementByPoint, useEventListener, useMouse } from '@vueuse/core'

const { x, y } = useMouse({ type: 'client' })
const { element } = useElementByPoint({ x, y })
const bounding = reactive(useElementBounding(element))
const html = ref('<div>inner shadow dom</div>')

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
</script>

<template>
  <div>
    <div :style="boxStyles" class="fixed pointer-events-none z-9999 border" />
    <div :style="pointStyles" class="fixed top-0 left-0 pointer-events-none w-2 h-2 rounded-full bg-green-400 shadow z-999" />
    <ShadowDom :html="html" />
  </div>
</template>