import { Component, PropTypes } from 'react'
import { camelCase, has } from 'lodash'

class BasicType extends Component {

  constructor() {
    super()

    this.state = { value: null }

    this.type = 'Basic'

    this.getStruct = () => {
      const structBase = this.props.struct[camelCase(`${this.type}Struct`)]
      if (!has(structBase, '≤Default≥')) { return structBase }
      const type = this.props.type === this.type ? '≤Default≥' : this.props.type
      return structBase[type]
    }

    this.updateValue = (e) => {
      this.props.onChange(e.target.value)
    }
  }

  componentWillMount() {
    this.setState({ value: this.props.value })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

}

BasicType.checkStruct = function (value, struct) {
  console.log(value, struct) // eslint-disable-line
  return true
}

BasicType.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
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

BasicType.defaultProps = {
  struct: {},
  onChange: () => {}
}

export default BasicType
