export default function isContainerQuery(property) {
  return property.substr(0, 10) === '@container'
}
