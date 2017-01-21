import React, { PropTypes } from 'react'

import RSelect from 'react-select' // eslint-disable-line

const Select = (props) => {
  return (
    <RSelect
      options={props.options}
      value={props.value}
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
