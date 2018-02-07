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
    const { struct } = this.props
    let inputProps = struct.inputProps || {}
    if (struct.disabled) {
      inputProps.disabled = true
    }
    return (
      <div style={{ marginTop: 25 }}>
        <label style={{ marginBottom: 10 }} className={this.props.displayProps.labelClass}>
          {struct.label}
        </label>
        <div className="Select">
          <input
            {...inputProps}
            type="number"
            autoComplete="off"
            value={this.state.value}
            onChange={this.updateValue}
            className={'Select-control Input ' + this.props.displayProps.inputClass}
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
