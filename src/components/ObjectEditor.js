import React, { Component, PropTypes } from 'react'
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
    const { struct: { objectStruct } } = this.props
    const { value } = this.state

    Object.keys(objectStruct).map((key, index) => (
      <Struct
        key={index}
        value={value[key]}
        struct={objectStruct[key]}
        onChange={this.createChangeHandler(key)}
        {...getTypeProps(this.props)}
      />
    ))
  }
}

ObjectEditor.propTypes = {
  value: PropTypes.object.isRequired,
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
