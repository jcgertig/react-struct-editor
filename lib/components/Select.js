'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-line

var Select = function Select(props) {
  return _react2["default"].createElement(_reactSelect2["default"], {
    options: props.options,
    value: props.value,
    className: props.className,
    onChange: function onChange(val) {
      return props.onChange({ target: { value: val.value } });
    }
  });
};

Select.propTypes = {
  value: _propTypes2["default"].any,
  options: _propTypes2["default"].array.isRequired,
  onChange: _propTypes2["default"].func.isRequired
};

exports["default"] = Select;