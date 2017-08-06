import React from 'react'
import BasicType from './BasicType'
import { isNumber, toNumber } from 'lodash'

class NumberType extends BasicType {

  constructor() {
    super()

    this.type = 'KeyValue'

    this.updateValue = (e) => {
      this.props.onChange(toNumber(e.target.value))
    }
  }

  render() {
    return (
      <div>
        <label>{this.props.struct.label}</label><br />
        <div className="Select">
          <input
            type="number"
            autoComplete="off"
            value={this.state.value}
            onChange={this.updateValue}
            className="Select-control Input"
          />
        </div>
      </div>
    )
  }
}

NumberType.checkStruct = function (value) {
  return isNumber(value)
}

export default NumberType
