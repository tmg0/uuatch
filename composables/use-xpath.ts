export interface UseXPathOptions {
  root?: string
}

const calcXPathByDOM = (element: HTMLElement) => {
  if (element.id) {
    return `id("${element.id}")`
  }
  if (element === document.body) {
    return '/html/body'
  }

  let position = 0
  const siblings = element.parentNode?.childNodes ?? []

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i]

    if (sibling === element) {
      return `${calcXPathByDOM(element.parentNode)}/${element.tagName.toLowerCase()}[${position + 1}]`
    }

    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      position++
    }
  }
}

export const useXPath = (element: MaybeRef<HTMLElement>, options?: UseXPathOptions) => {
  const xpath = computed(() => {
    return calcXPathByDOM(unref(element))
  })

  return { xpath }
}
