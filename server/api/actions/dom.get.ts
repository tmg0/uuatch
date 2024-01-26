import { string, object, url, parse, type Input } from 'valibot'
import puppeteer from 'puppeteer'

const schema = object({
  url: string([url('Invalid url')])
})

type Schema = Input<typeof schema>

export default defineEventHandler(async (event) => {
  const query = getQuery<Schema>(event)
  parse(schema, query)
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.goto(query.url, { waitUntil: 'networkidle2' })

  await page.evaluate(() => {
    document.querySelectorAll('a').forEach((a) => {
      const span = document.createElement('span')
      span.innerHTML = a.innerHTML
      if (a && a.parentNode) { a.parentNode.replaceChild(span, a) }
    })
    document.querySelectorAll('input, select, script, link').forEach((el) => {
      if (el && el.parentNode) { el.parentNode.removeChild(el) }
    })
  })

  const content = await page.content()
  await browser.close()
  return content
})
