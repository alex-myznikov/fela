import { objectReduce } from 'fast-loops'

import getNodeSibling from './getNodeSibling'

export default function createNode(
  attributes,
  targetDocument = document,
  sortMediaQuery,
  styleNodeAttributes
) {
  const head = targetDocument.head || {}
  const { type, media, support, container } = attributes

  const node = targetDocument.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (support) {
    node.setAttribute('data-fela-support', 'true')
  }

  if (media) {
    node.media = media
  }

  if (container) {
    node.container = container
  }

  // applying custom style tag attributes
  for (let attribute in styleNodeAttributes) {
    node.setAttribute(attribute, styleNodeAttributes[attribute])
  }

  // also apply attributes set globally with window.FelaConfig
  if (typeof window !== undefined && window.FelaConfig) {
    for (let attribute in window.FelaConfig.styleNodeAttributes) {
      node.setAttribute(
        attribute,
        window.FelaConfig.styleNodeAttributes[attribute]
      )
    }
  }

  const nodes = head.querySelectorAll('[data-fela-type]')
  const sibling = getNodeSibling([...nodes], attributes, sortMediaQuery)

  if (sibling) {
    head.insertBefore(node, sibling)
  } else {
    head.appendChild(node)
  }

  return node
}
