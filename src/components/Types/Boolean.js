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
    const { struct } = this.props
    let inputProps = struct.inputProps || {}
    if (struct.disabled) {
      inputProps.disabled = true
    }
    return (
      <div style={{ marginTop: '25px' }}>
        <label style={{ marginBottom: 10 }} className={this.props.displayProps.labelClass}>
          {this.props.struct.label}
        </label>
        <input
          {...inputProps}
          type="checkbox"
          onChange={this.updateValue}
          className={this.props.displayProps.inputClass}
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
