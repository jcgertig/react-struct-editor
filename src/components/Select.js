import React from 'react'
import PropTypes from 'prop-types'
import RSelect from 'react-select' // eslint-disable-line

const Select = (props) => {
  return (
    <RSelect
      options={props.options}
      value={props.value}
      className={props.className}
      onChange={(val) => props.onChange({ target: { value: val.value } })}
    />
  )
}

Select.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Select
