import React from 'react'
import BasicType from './BasicType'

import Select from '../Select' // eslint-disable-line

class OptionType extends BasicType {

  constructor() {
    super()

    this.type = 'Option'
  }

  render() {
    const { type, optionTypes } = this.props
    return (
      <Select
        value={this.state.value}
        onChange={this.updateValue}
        options={optionTypes[type.replace('Option', '')]}
      />
    )
  }
}

OptionType.checkStruct = function () {
  return true
}

export default OptionType
