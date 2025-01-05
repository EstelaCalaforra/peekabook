export function getFirst80Characters (text) {
  if (text.length > 80) {
    return text.substring(0, 80) + '...'
  } else {
    return text
  }
}
