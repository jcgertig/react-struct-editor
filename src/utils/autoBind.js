import { has } from 'lodash'

export default function autoBind(scope, names = []) {
  for (const name of names) {
    if (has(scope, name)) {
      scope[name] = scope[name].bind(scope)
    }
  }
}
