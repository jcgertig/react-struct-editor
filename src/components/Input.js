import React, { Component, PropTypes } from 'react'
import { lowerCase, isUndefined, has, isArray, toNumber, toString } from 'lodash'
import arrayToOptions from '../utils/arrayToOptions'
import autoBind from '../utils/autoBind'

import Select from 'react-select'

class Input extends Component {

  constructor() {
    super()

    this.state = {
      type: null
    }

    autoBind(this, [ 'typeOf', 'updateValue', 'updateType' ])
  }

  componentWillMount() {
    let type = null
    if (isArray(this.typeOf())) {
      const valType = lowerCase(typeof(this.props.value))
      if (this.typeOf().indexOf(valType) > -1) {
        type = valType
      } else {
        type = this.typeOf()[0]
      }
    }
    this.setState({ value: this.props.value, type })
  }

  componentWillReceiveProps(nextProps) {
    let type = null
    if (isArray(this.typeOf())) {
      let valType = lowerCase(typeof(nextProps.value))
      if (valType === 'string') { valType = 'text' }
      if (this.typeOf().indexOf(valType) > -1) {
        type = valType
      } else {
        type = this.typeOf()[0]
      }
    }
    this.setState({ value: nextProps.value, type })
  }

  typeOf(type) {
    if (isArray(this.props.struct.type)) {
      if (isUndefined(type)) {
        return this.props.struct.type.map(t => lowerCase(t))
      }
      return type === 'optional'
    }
    const sType = lowerCase(this.props.struct.type)
    if (isUndefined(type)) {
      if (sType === 'id') { return 'text' }
      if (this.typeOf('option')) { return sType.replace(' option', '') }
      return sType
    }
    if (type === 'select') {
      return has(this.props.struct, 'options')
    }
    if (type === 'text') {
      return sType === 'text' || sType === 'id'
    }
    if (type === 'option') {
      return sType.indexOf('option') > 0
    }
    return type === sType
  }

  updateValue(e) {
    let value = e.target.value
    if (this.typeOf('boolean') || this.state.type === 'boolean') {
      value = isUndefined(this.state.value) ? true : !this.state.value
    }
    if (this.state.type === 'number') {
      value = toNumber(value)
    }
    this.setState({ value }, () => {
      this.props.onChange(this.props.name, value)
    })
  }

  updateType(type) {
    let { value } = this.state
    if (!isUndefined(value) && this.state.type !== type) {
      if (type === 'boolean') {
        value = false
      } else if (type === 'text') {
        value = toString(value)
      } else if (type === 'number') {
        value = toNumber(value)
      }
    }
    this.setState({ type, value }, () => {
      this.props.onChange(this.props.name, value)
    })
  }

  render() {
    const { value } = this.state
    const { struct, optionTypes } = this.props
    if (this.typeOf('boolean')) {
      return (
        <input
          type="checkbox"
          style={{ width: '100%', boxSizing: 'border-box' }}
          checked={isUndefined(value) ? false : value}
          onChange={this.updateValue}
        />
      )
    } else if (this.typeOf('select')) {
      return (
        <Select
          options={struct.options}
          value={value}
          onChange={(val) => this.updateValue({ target: { value: val.value } })}
        />
      )
    } else if (this.typeOf('option')) {
      const options = optionTypes[this.typeOf()]
      return (
        <Select
          options={options}
          value={value}
          onChange={(val) => this.updateValue({ target: { value: val.value } })}
        />
      )
    } else if (this.typeOf('optional')) {
      const options = arrayToOptions(this.typeOf())
      return (
        <div>
          <Select
            options={options}
            value={this.state.type}
            onChange={(val) => this.updateType(val.value)}
          />
          {
            this.state.type === 'boolean' &&
            (
              <input
                type="checkbox"
                style={{ width: '100%', boxSizing: 'border-box' }}
                checked={isUndefined(value) ? false : value}
                onChange={this.updateValue}
              />
            )
          }
          {
            this.state.type !== 'boolean' &&
            (
              <div className="Select">
                <input
                  key={this.state.type}
                  type={this.state.type}
                  autoComplete="off"
                  className="Select-control Input"
                  value={value}
                  onChange={this.updateValue}
                />
              </div>
            )
          }
        </div>
      )
    }
    return (
      <div className="Select">
        <input
          type={this.typeOf()}
          autoComplete="off"
          className="Select-control Input"
          value={value}
          onChange={this.updateValue}
        />
      </div>
    )
  }
}

Input.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.any.isRequired,
  struct: PropTypes.any.isRequired,
  optionTypes: PropTypes.object.isRequired
}

export default Input
