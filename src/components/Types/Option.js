import React from 'react'
import BasicType from './BasicType'

import Select from '../Select' // eslint-disable-line

class OptionType extends BasicType {

  constructor() {
    super()

    this.type = 'Option'
  }

  render() {
    const { type, struct, optionTypes } = this.props
    return (
      <div>
        <label>{struct.label}</label><br />
        <Select
          value={this.state.value}
          onChange={this.updateValue}
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
