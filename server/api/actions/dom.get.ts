import { string, object, url, parse, type Input } from 'valibot'

const schema = object({
  url: string([url('Invalid url')])
})

type Schema = Input<typeof schema>

export default defineEventHandler((event) => {
  const query = getQuery<Schema>(event)
  parse(schema, query)
  return $fetch(query.url)
})
