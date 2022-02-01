export const isPreflight = (
  method: Request['method'] | undefined,
  fn?: () => void
) => {
  if (method === 'OPTIONS') {
    if (fn) fn()
    return true
  }
  return false
}
