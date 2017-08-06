import React, { Component, PropTypes } from 'react'
import { isPlainObject, isArray, uniq, endsWith, capitalize, camelCase } from 'lodash'

import autoBind from '../utils/autoBind'
import getTypeProps from '../utils/getTypeProps'
import { BASIC_TYPES } from '../utils/types'

const joinTypes = (props) => {
  const joint = {}
  const types = getTypeProps(props)
  Object.keys(types).forEach(key => {
    const type = capitalize(key.replace('Types', ''))
    Object.keys(types[key]).forEach(innerKey => {
      let setKey = `${innerKey}${type}`
      if (innerKey === '≤Default≥') { setKey = type }
      joint[setKey] = types[key][type === 'option' ? '≤Default≥' : innerKey]
    })
  })
  return joint
}

class Struct extends Component {

  constructor() {
    super()

    this.state = { value: null }

    autoBind(this, [])
  }

  componentWillMount() {
    this.setState({ value: this.props.value })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  getType() {
    const { struct, collectionTypes } = this.props
    const { value } = this.state

    const checkStruct = (structType, structDef, attr, types) => {
      const name = structType.replace(attr, '') || '≤Default≥'
      return types[name].checkStruct(value, name, structDef)
    }

    const getFromSet = (attr) => {
      const types = struct.type.filter((t) => endsWith(t, attr))
      if (types.length > 0) {
        if (types.length === 1) { return types[0] }
        for (const colType of types) {
          if (checkStruct(colType, struct[camelCase(`${attr}Struct`)], attr, collectionTypes)) {
            return colType
          }
        }
      }
      return null
    }

    if (isArray(struct.type)) {
      if (isArray(value)) {
        if (value.length > 1) {
          const types = uniq(value.map(val => typeof(val)))
          if (types.length === 1 && isPlainObject(value[0])) {
            const gotType = getFromSet('Collection')
            if (gotType !== null) { return gotType }
          }
        }
        return getFromSet('Array') || ''
      } else if (isPlainObject(value)) {
        const gotType = getFromSet('Object')
        if (gotType === 'Object' || gotType === null) {
          const gotTypeTwo = getFromSet('KeyValue')
          if (gotTypeTwo === null && gotType !== null) { return gotType }
          if (gotTypeTwo !== null) { return gotTypeTwo }
        }
        if (gotType !== null) { return gotType }
      } else {
        for (const basicType of BASIC_TYPES) {
          const gotType = getFromSet(basicType)
          if (gotType !== null) { return gotType }
        }
      }
      return ''
    }
    return struct.type
  }

  render() {
    const type = this.getType()
    const Comp = joinTypes(this.props)[type] // eslint-disable-line no-unused-vars
    return <Comp type={type} {...this.props} />
  }
}

Struct.propTypes = {
  value: PropTypes.any,
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

export default Struct
