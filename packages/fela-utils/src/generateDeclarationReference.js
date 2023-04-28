export default function generateDeclarationReference(
  property,
  value,
  pseudo = '',
  media = '',
  support = '',
  container = ''
) {
  return container + support + media + pseudo + property + value
}
