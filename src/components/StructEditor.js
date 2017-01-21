import React, { Component, PropTypes } from 'react'
import { assign } from 'lodash'

import ObjectEditor from './ObjectEditor'  // eslint-disable-line no-unused-vars
import Types from './Types'

class StructEditor extends Component {

  render() {
    const { struct, data, setData } = this.props

    if (struct.type === 'Object') {
      const typeProps = {}
      Object.keys(Types).forEach(key => {
        typeProps[`${key}Types`] = assign({}, this.props[`${key}Types`], { '≤Default≥': Types[key] })
      })

      return (
        <ObjectEditor
          value={data}
          struct={struct}
          onChange={setData}
          {...typeProps}
        />
      )
    } else {
      return (<div>Alert! Struct has to start with an Object type!</div>)
    }
  }
}

StructEditor.propTypes = {
  updateRef: PropTypes.func,
  optionTypes: PropTypes.object,
  collectionTypes: PropTypes.object,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  struct: PropTypes.object.isRequired
}

StructEditor.defaultProps = {
  textTypes: {},
  arrayTypes: {},
  numberTypes: {},
  optionTypes: {},
  objectTypes: {},
  booleanTypes: {},
  keyValueTypes: {},
  collectionTypes: {},
  updateRef: () => {}
}

export default StructEditor
