import React from 'react'
import BasicType from './BasicType'
import { isString } from 'lodash'

class TextType extends BasicType {

  constructor() {
    super()

    this.type = 'Text'
  }

  render() {
    return (
      <div className="Select">
        <input
          type="text"
          autoComplete="off"
          value={this.state.value}
          onChange={this.updateValue}
          className="Select-control Input"
        />
      </div>
    )
  }
}

TextType.checkStruct = function (value) {
  return isString(value)
}

export default TextType
