import { startCase } from 'lodash'

export default function arrayToOptions(array, useStart = true) {
  return array.map(i => ({ label: (useStart ? startCase(i) : i), value: i }))
}
