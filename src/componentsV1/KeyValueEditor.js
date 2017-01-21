import React, { Component, PropTypes } from 'react'
import { has, isUndefined, isString, isFunction } from 'lodash'
import autoBind from '../utils/autoBind'

import Panel from './Panel'
import Input from './Input'
import StructEditor from './StructEditor'

class KeyValueEditor extends Component {

  constructor() {
    super()

    this.state = {
      data: {}
    }

    autoBind(this, [ 'updateValue', 'renderKeyInput', 'renderValInput' ])
  }

  componentWillMount() {
    const { data, struct } = this.props
    if (isUndefined(data)) {
      this.setState({ data: struct.type === 'Object' ? {} : [] })
    } else {
      this.setState({ data })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  updateValue(index, val) {
    const { data } = this.state
    data[index] = val
    this.props.updateData(this.props.index, data)
  }

  renderKeyInput() {
    const { struct } = this.props
    return (
      <div style={{ marginTop: '25px' }}>
        <label>{struct.keyStruct.label}</label><br />
        <Input
          name={0}
          struct={struct.keyStruct}
          value={this.state.data[0]}
          onChange={this.updateValue}
          optionTypes={this.props.optionTypes}
        />
      </div>
    )
  }

  renderValInput() {
    const { struct, optionTypes, collectionTypes, updateData } = this.props
    if (struct.type === 'KeyValue') {
      return (
        <div style={{ marginTop: '25px' }}>
          <label>{struct.valueStruct.label}</label><br />
          <Input
            name={1}
            struct={struct.valueStruct}
            value={this.state.data[1]}
            onChange={this.updateValue}
            optionTypes={this.props.optionTypes}
          />
        </div>
      )
    } else if (struct.type === 'Object') {
      return (
        <StructEditor
          struct={struct}
          data={this.state.data}
          setData={updateData}
          optionTypes={optionTypes}
          collectionTypes={collectionTypes}
        />
      )
    }
  }

  render() {
    const { struct } = this.props
    if (struct.type === 'Object') {
      return (
        <div style={{ marginTop: '25px' }}>
          {struct.type === 'KeyValue' && this.renderKeyInput()}
          {this.renderValInput()}
        </div>
      )
    }

    let header = 'No header attr update struct.'
    if (has(struct, 'header')) {
      if (isString(struct.header) && has(this.state.data, struct.header)) {
        header = this.state.data[struct.header]
      } else if (isFunction(struct.header)) {
        header = struct.header(this.state.data, parseInt(this.props.index, 10))
      }
    }
    return (
      <Panel {...this.props} header={header}>
        <div style={{ marginTop: '25px' }}>
          {struct.type === 'KeyValue' && this.renderKeyInput()}
          {this.renderValInput()}
        </div>
      </Panel>
    )
  }
}

KeyValueEditor.propTypes = {
  data: PropTypes.any,
  updateData: PropTypes.func,
  optionTypes: PropTypes.object,
  struct: PropTypes.any.isRequired,
  collectionTypes: PropTypes.object,

  index: PropTypes.any,
  openPanel: PropTypes.func,
  isOpen: PropTypes.any
}

export default KeyValueEditor
