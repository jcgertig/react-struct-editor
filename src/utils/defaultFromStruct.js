export default function defaultFromStruct(struct) {
  const defaultStruct = {}
  for (const attr of Object.keys(struct || {})) {
    defaultStruct[attr] = struct[attr].default
  }
  return defaultStruct
}
