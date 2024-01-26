<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { defu } from 'defu'
import { useElementBounding, useElementByPoint, useEventListener, useMouse, useTextSelection } from '@vueuse/core'

interface Props {
  boxStyle?: Record<string, string | number>
  document?: ShadowRoot
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

const { x, y } = useMouse({ type: 'client' })
const { element, pause, resume } = useElementByPoint({ x, y, document: props.document as unknown as Document })
const bounding = reactive(useElementBounding(element))
const { text } = useTextSelection()

watch(text, (value) => { value ? onSelect() : resume() })

useEventListener('scroll', bounding.update, true)

const boxStyles = computed(() => {
  if (element.value) {
    return defu({
      display: 'block',
      width: `${bounding.width}px`,
      height: `${bounding.height}px`,
      left: `${bounding.left}px`,
      top: `${bounding.top}px`,
      backgroundColor: '#3eaf7c44',
      transition: 'all 0.05s linear'
    }, props.boxStyle ?? {})
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
