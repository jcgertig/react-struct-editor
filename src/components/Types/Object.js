import React from 'react'
import BasicType from './BasicType'
import { isPlainObject } from 'lodash'

import ObjectEditor from '../ObjectEditor' // eslint-disable-line

class ObjectType extends BasicType {

  constructor() {
    super()

    this.type = 'Object'
  }

  render() {
    if (!this.props.top) {
      return (
        <div>
          <label>{this.props.struct.label}</label><br />
          <ObjectEditor {...this.props} />
        </div>
      )
    }
    return <ObjectEditor {...this.props} />
  }
}

ObjectType.checkStruct = function (value) {
  return isPlainObject(value)
}

export default ObjectType
