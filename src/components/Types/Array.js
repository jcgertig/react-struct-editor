import React from 'react'
import BasicType from './BasicType'
import { isArray, has, cloneDeep, isUndefined, isString, isFunction } from 'lodash'

import getTypeProps from '../../utils/getTypeProps'
import defaultFromStruct from '../../utils/defaultFromStruct'
import autoBind from '../../utils/autoBind'

import Accordion from '../Accordion' // eslint-disable-line no-unused-vars
import Panel from '../Panel' // eslint-disable-line no-unused-vars
import Struct from '../Struct' // eslint-disable-line no-unused-vars

class ArrayType extends BasicType {

  constructor() {
    super()

    this.state = {
      value: []
    }

    this.type = 'Array'

    autoBind(this, [
      'handleChange', 'updateIndex', 'updateCollectionOrder',
      'renderIndexs', 'handleAdd', 'handleRemove'
    ])
  }

  handleChange() {
    this.props.onChange(this.state.value)
  }

  updateIndex(index, data) {
    const { value } = cloneDeep(this.state)
    value[index] = data
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
    let { value } = this.state
    const struct = this.getStruct()
    if (typeof value === 'undefined') {
      value = []
    }
    value.push(defaultFromStruct(struct))
    this.setState({ value })
  }

  handleRemove(index) {
    const { value } = this.state
    value.splice(index, 1)
    this.setState({ value })
  }

  renderIndexs() {
    let { struct: { header, ...props }, displayProps } = this.props
    const struct = this.getStruct()

    return this.state.value.map((val, index) => {
      let headerText = ''
      if (!isUndefined(header)) {
        if (isString(header) && has(val, header)) {
          headerText = val[header]
        } else if (isFunction(header)) {
          headerText = header(val, index)
        }
      } else {
        headerText = 'No header attr update struct.'
      }

      return (
        <Panel key={index} header={headerText} {...props}>
          <Struct
            key={index}
            value={val}
            struct={struct}
            onChange={this.updateIndex.bind(this, index)}
            {...getTypeProps(this.props)}
          />
          <button
            style={{ marginTop: 25 }}
            className={displayProps.buttonClass}
            onClick={() => this.handleRemove(index)}
          >
            {has(struct, 'removeText') ? struct.removeText : 'Remove Item'}
          </button>
        </Panel>
      )
    })
  }

  render() {
    const { struct, displayProps } = this.props
    return (
      <div style={{ marginTop: '25px' }}>
        <label style={{ marginBottom: 10 }} className={displayProps.labelClass}>
          {struct.label}
        </label>
        <Accordion
          orderable={has(struct, 'orderable') ? struct.orderable : true}
          reorder={this.updateCollectionOrder}
        >
          {this.renderIndexs()}
        </Accordion>
        <button
          style={{ marginTop: 25 }}
          onClick={this.handleAdd}
          className={displayProps.buttonClass}
        >
          {has(struct, 'addText') ? struct.addText : 'Add Item'}
        </button>
      </div>
    )
  }
}

ArrayType.checkStruct = function (value) {
  return isArray(value)
}

export default ArrayType
