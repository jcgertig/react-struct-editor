import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import autoBind from '../utils/autoBind'
import getTypeProps from '../utils/getTypeProps'

import Struct from './Struct' // eslint-disable-line

class ObjectEditor extends Component {

  constructor() {
    super()

    this.state = {}

    autoBind(this, [ 'updateStateKey', 'createChangeHandler' ])
  }

  componentWillMount() {
    this.setState(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value)
  }

  updateStateKey(key, val) {
    this.setState({ [key]: val }, () => this.props.onChange(this.state))
  }

  createChangeHandler(key) {
    return this.updateStateKey.bind(this, key)
  }

  render() {
    const { struct: { objectStruct }, displayProps } = this.props
    const value = cloneDeep(this.state)

    return (
      <div>
        {Object.keys(objectStruct).map((key, index) => (
          <Struct
            key={index}
            value={value[key]}
            struct={objectStruct[key]}
            onChange={this.createChangeHandler(key)}
            displayProps={displayProps}
            {...getTypeProps(this.props)}
          />
        ))}
      </div>
    )
  }
}

ObjectEditor.propTypes = {
  value: PropTypes.object,
  struct: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  textTypes: PropTypes.object.isRequired,
  arrayTypes: PropTypes.object.isRequired,
  numberTypes: PropTypes.object.isRequired,
  optionTypes: PropTypes.object.isRequired,
  objectTypes: PropTypes.object.isRequired,
  booleanTypes: PropTypes.object.isRequired,
  keyValueTypes: PropTypes.object.isRequired,
  collectionTypes: PropTypes.object.isRequired
}

export default ObjectEditor
