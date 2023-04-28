export default function generateCSSContainerRule(container, cssRules) {
  return `@container ${container}{${cssRules}}`
}
