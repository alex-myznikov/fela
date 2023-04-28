import queryNode from './queryNode'
import createNode from './createNode'

function getReference({ type, media = '', support = '', container = '' }) {
  return type + media + support + container
}

export default function getNodeFromCache(
  attributes,
  renderer,
  targetDocument = document
) {
  const reference = getReference(attributes)

  if (!renderer.nodes[reference]) {
    const node =
      queryNode(attributes, targetDocument) ||
      createNode(
        attributes,
        targetDocument,
        renderer.sortMediaQuery,
        renderer.styleNodeAttributes
      )

    renderer.nodes[reference] = node
  }

  return renderer.nodes[reference]
}
