import { FONT_TYPE, STATIC_TYPE, KEYFRAME_TYPE, RULE_TYPE } from 'fela-utils'

export default function getNodeSibling(
  nodes,
  { type, media, support, container },
  sortMediaQuery
) {
  switch (type) {
    case FONT_TYPE:
    case STATIC_TYPE:
    case KEYFRAME_TYPE:
      return nodes[0]
    case RULE_TYPE:
      const mediaNodes = nodes.map((node) => node.container || node.media)
      const filteredNodes = mediaNodes.filter((m) => m.length !== 0)

      media = container || media

      if (media) {
        const sorted = [...filteredNodes, media].sort(sortMediaQuery)
        const index = sorted.indexOf(media) + 1
        const insertMedia = sorted[index]

        if (insertMedia) {
          if (insertMedia === media && support) {
            // support
            return nodes.find(
              ({ container, media }) =>
                (container || media) === sorted[sorted.indexOf(media) + 2]
            )
          }
          return nodes.find(
            ({ container, media }) =>
              (container || media) === insertMedia
          )
        }
      } else {
        const sorted = filteredNodes.sort(sortMediaQuery)
        const insertMedia = sorted[0]

        if (!support) {
          // if we insert the plain RULE node while there's already a support RULE node
          // make sure to insert before
          const supportNode = nodes.find(
            (el) =>
              el.getAttribute('data-fela-support') !== undefined &&
              (el.container || el.media) === '' &&
              el.getAttribute('data-fela-type') === 'RULE'
          )

          if (supportNode) {
            return supportNode
          }
        }

        if (insertMedia) {
          return nodes.find(
            ({ container, media }) =>
              (container || media) === insertMedia
          )
        }
      }
  }
}
