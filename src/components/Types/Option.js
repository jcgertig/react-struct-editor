import React from 'react'
import BasicType from './BasicType'

import Select from '../Select' // eslint-disable-line

class OptionType extends BasicType {

  constructor() {
    super()

    this.type = 'Option'
  }

  render() {
    const { type, struct, optionTypes, displayProps } = this.props
    return (
      <div style={{ marginTop: '25px' }}>
        <label style={{ marginBottom: 10 }} className={displayProps.labelClass}>
          {struct.label}
        </label>
        <Select
          value={this.state.value}
          onChange={this.updateValue}
          className={displayProps.inputClass}
          options={optionTypes[type.replace('Option', '')]}
        />
      </div>
    )
  }
}

OptionType.checkStruct = function () {
  return true
}

export default OptionType
