import React from 'react'
import BasicType from './BasicType'
import {
  isPlainObject, has, toPairs, cloneDeep, isString, isFunction, isUndefined
} from 'lodash'

import getTypeProps from '../../utils/getTypeProps'
import autoBind from '../../utils/autoBind'

import Accordion from '../Accordion' // eslint-disable-line no-unused-vars
import Panel from '../Panel' // eslint-disable-line no-unused-vars
import Struct from '../Struct' // eslint-disable-line no-unused-vars

class KeyValueType extends BasicType {

  constructor() {
    super()

    this.state = {
      value: []
    }

    this.type = 'KeyValue'

    autoBind(this, [
      'handleChange', 'renderKeyValuePairs', 'updatePair', 'updateCollectionOrder',
      'renderKeyInput', 'renderValInput'
    ])
  }

  componentWillMount() {
    this.setState({ value: toPairs(this.props.value) })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: toPairs(nextProps.value) })
  }

  handleChange() {
    const data = {}
    for (const val of this.state.value) {
      data[val[0]] = val[1]
    }
    this.props.onChange(data)
  }

  updatePair(index, indexTwo, data) {
    const { value } = cloneDeep(this.state)
    value[index][indexTwo] = data
    this.setState({ value }, this.handleChange)
  }

  updateCollectionOrder(newOrder) {
    const value = []
    for (const order of newOrder) {
      value.push(this.state.value[parseInt(order, 10)])
    }
    this.setState({ value }, this.handleChange)
  }

  renderKeyInput(index) {
    const { struct } = this.props
    return (
      <div key={index} style={{ marginTop: '25px' }}>
        <label>{struct.keyStruct.label}</label><br />
        <Struct
          key={index}
          struct={struct.keyStruct}
          value={this.state.value[index][0]}
          onChange={this.updatePair.bind(this, index, 0)}
          {...getTypeProps(this.props)}
        />
      </div>
    )
  }

  renderValInput(index) {
    const struct = this.getStruct()
    return (
      <div key={index} style={{ marginTop: '25px' }}>
        <Struct
          key={index}
          struct={struct}
          value={this.state.value[index][1]}
          onChange={this.updatePair.bind(this, index, 1)}
          {...getTypeProps(this.props)}
        />
      </div>
    )
  }

  renderKeyValuePairs() {
    let { struct: { header, ...props } } = this.props

    return this.state.value.map((val, index) => {
      if (!isUndefined(header)) {
        if (isString(header) && has(val, header)) {
          header = val[header]
        } else if (isFunction(header)) {
          header = header(val, index)
        }
      } else {
        header = 'No header attr update struct.'
      }

      return (
        <Panel key={index} header={header} {...props}>
          <div style={{ marginTop: '25px' }}>
            {this.renderKeyInput(index)}
            {this.renderValInput(index)}
          </div>
        </Panel>
      )
    })
  }

  render() {
    const { struct } = this.props
    return (
      <div>
        <label>{struct.label}</label><br />
        <Accordion
          orderable={has(struct, 'orderable') ? struct.orderable : true}
          reorder={this.updateCollectionOrder}
        >
          {this.renderKeyValuePairs()}
        </Accordion>
      </div>
    )
  }
}

KeyValueType.checkStruct = function (value) {
  return isPlainObject(value)
}

export default KeyValueType
