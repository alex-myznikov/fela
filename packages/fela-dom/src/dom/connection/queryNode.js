export default function queryNode(
  { type, media, support, container },
  targetDocument = document
) {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([data-fela-support="true"])'
  const containerQuery = container
    ? `[container="${container}"]`
    : ':not([container])'

  return targetDocument.querySelector(
    `[data-fela-type="${type}"]${supportQuery}${mediaQuery}${containerQuery}`
  )
}
