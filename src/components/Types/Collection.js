import React from 'react'
import BasicType from './BasicType'
import {
  isArray, has, cloneDeep, isUndefined, isString, isFunction, isPlainObject, chain
} from 'lodash'

import getTypeProps from '../../utils/getTypeProps'
import defaultFromStruct from '../../utils/defaultFromStruct'
import autoBind from '../../utils/autoBind'

import Accordion from '../Accordion' // eslint-disable-line no-unused-vars
import Panel from '../Panel' // eslint-disable-line no-unused-vars
import Struct from '../Struct' // eslint-disable-line no-unused-vars

class CollectionType extends BasicType {

  constructor() {
    super()

    this.state = {
      value: []
    }

    this.type = 'Collection'

    autoBind(this, [
      'handleChange', 'updateIndexAttr', 'updateCollectionOrder',
      'renderIndexs', 'handleAdd', 'handleRemove'
    ])
  }

  handleChange() {
    this.props.onChange(this.state.value)
  }

  updateIndexAttr(index, attr, data) {
    const { value } = cloneDeep(this.state)
    value[index][attr] = data
    this.setState({ value }, this.handleChange)
  }

  updateCollectionOrder(newOrder) {
    const value = []
    for (const order of newOrder) {
      value.push(this.state.value[parseInt(order, 10)])
    }
    this.setState({ value }, this.handleChange)
  }

  handleAdd() {
    const { value } = this.state
    const struct = this.getStruct()
    value.push(defaultFromStruct(struct))
    this.setState({ value })
  }

  handleRemove(index) {
    const { value } = this.state
    value.splice(index, 1)
    this.setState({ value })
  }

  renderIndexs() {
    let { struct: { header, ...props } } = this.props
    const struct = this.getStruct()
    if (typeof this.state.value === 'undefined') {
      return []
    }
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
          {Object.keys(struct).map(key => (
            <Struct
              key={`${index}-${key}`}
              value={val[key]}
              struct={struct[key]}
              onChange={this.updateIndexAttr.bind(this, index, key)}
              {...getTypeProps(this.props)}
            />
          ))}
          <button
            style={{ marginTop: 25 }}
            onClick={() => this.handleRemove(index)}
          >
            {has(struct, 'removeText') ? struct.removeText : 'Remove Item'}
          </button>
        </Panel>
      )
    })
  }

  render() {
    const { struct } = this.props
    return (
      <div style={{ marginTop: '25px' }}>
        <label>{struct.label}</label><br />
        <Accordion
          orderable={has(struct, 'orderable') ? struct.orderable : true}
          reorder={this.updateCollectionOrder}
        >
          {this.renderIndexs()}
        </Accordion>
        <button style={{ marginTop: 25 }} onClick={this.handleAdd}>
          {has(struct, 'addText') ? struct.addText : 'Add Item'}
        </button>
      </div>
    )
  }
}

CollectionType.checkStruct = function (value) {
  if (!isArray(value)) { return false }
  const check = chain(value).map((v) => isPlainObject(v)).uniq().value()
  return check.length === 1 && check[0] === true
}

export default CollectionType
