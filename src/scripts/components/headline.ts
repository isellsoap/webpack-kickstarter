import { hello } from './hello'

export const headline = (): void => {
  const body = document.body
  const el = document.createElement('h1')

  el.innerHTML = hello()
  body.insertBefore(el, body.firstChild)
}
