import React from 'react'
import BasicType from './BasicType'
import { isString } from 'lodash'

class TextType extends BasicType {

  constructor() {
    super()

    this.type = 'Text'
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
          {struct.label}
        </label>
        <div className="Select">
          <input
            {...inputProps}
            type="text"
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

TextType.checkStruct = function (value) {
  return isString(value)
}

export default TextType
