import React from 'react'
import BasicType from './BasicType'
import { isBoolean, isUndefined } from 'lodash'

class BooleanType extends BasicType {

  constructor() {
    super()

    this.type = 'Boolean'

    this.updateValue = () => {
      this.props.onChange(!this.state.value)
    }
  }

  render() {
    return (
      <div>
        <label>{this.props.struct.label}</label><br />
        <input
          type="checkbox"
          onChange={this.updateValue}
          style={{ width: '100%', boxSizing: 'border-box' }}
          checked={isUndefined(this.state.value) ? false : this.state.value}
        />
      </div>
    )
  }
}

BooleanType.checkStruct = function (value) {
  return isBoolean(value)
}

export default BooleanType
