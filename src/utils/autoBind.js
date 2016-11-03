import { isUndefined } from 'lodash'

export default function autoBind(scope, names = []) {
  for (const name of names) {
    if (isUndefined(scope[name])) {
      console.error('Missing ', name)
    } else {
      scope[name] = scope[name].bind(scope)
    }
  }
}
