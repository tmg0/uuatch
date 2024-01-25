export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return $fetch(body.url)
})
