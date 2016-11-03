import React, { Component, PropTypes } from 'react'
import { has, toPairs, cloneDeep } from 'lodash'
import autoBind from '../utils/autoBind'

import Accordion from './Accordion'
import KeyValueEditor from './KeyValueEditor'

class ObjectEditor extends Component {

  constructor() {
    super()

    this.state = {
      value: {}
    }

    autoBind(this, [ 'updateValue', 'updatePair', 'updateState', 'updateCollectionOrder' ])
  }

  componentWillMount() {
    let { value } = this.props
    value = this.props.struct.type === 'KeyValue' ? toPairs(value) : value
    this.setState({ value })
  }

  componentWillReceiveProps(nextProps) {
    let { value } = nextProps
    value = nextProps.struct.type === 'KeyValue' ? toPairs(value) : value
    this.setState({ value })
  }

  updateValue() {
    const { value } = this.state
    if (this.props.struct.type === 'Object') {
      this.props.onChange(this.props.name, value)
    } else {
      const data = {}
      for (const val of value) {
        data[val[0]] = val[1]
      }
      this.props.onChange(this.props.name, data)
    }
  }

  updatePair(index, data) {
    const { value } = cloneDeep(this.state)
    value[index] = data
    this.setState({ value }, this.updateValue)
  }

  updateState(value) {
    this.setState({ value }, this.updateValue)
  }

  updateCollectionOrder(newOrder) {
    this.props.updateCollectionOrder(this.props.name, newOrder)
  }

  render() {
    const { struct } = this.props

    const renderKeyValuePairs = () => {
      const { value } = this.state
      const { optionTypes, collectionTypes } = this.props

      if (struct.type === 'KeyValue') {
        return value.map((val, i) => (
          <KeyValueEditor
            key={i}
            data={val}
            struct={struct}
            optionTypes={optionTypes}
            updateData={this.updatePair}
          />
        ))
      } else if (struct.type === 'Object') {
        return (
          <KeyValueEditor
            data={value}
            struct={struct}
            optionTypes={optionTypes}
            updateData={this.updateState}
            collectionTypes={collectionTypes}
          />
        )
      }
    }

    if (struct.type === 'Object') {
      return renderKeyValuePairs()
    }

    return (
      <Accordion
        orderable={has(struct, 'orderable') ? struct.orderable : true}
        reorder={this.updateCollectionOrder}
      >
        {renderKeyValuePairs()}
      </Accordion>
    )
  }
}

ObjectEditor.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.any.isRequired,
  struct: PropTypes.any.isRequired,
  collectionTypes: PropTypes.object,
  updateCollectionOrder: PropTypes.func,
  optionTypes: PropTypes.object.isRequired
}

export default ObjectEditor
