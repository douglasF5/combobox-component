// component template
export const component = name => `
export function ${name} () {
  return (
    <div>Hello 👋, I am a ${name} component.</div>
  )
}
`