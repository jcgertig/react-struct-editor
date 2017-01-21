'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicType2 = require('./BasicType');

var _BasicType3 = _interopRequireDefault(_BasicType2);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line

var OptionType = function (_BasicType) {
  _inherits(OptionType, _BasicType);

  function OptionType() {
    _classCallCheck(this, OptionType);

    var _this = _possibleConstructorReturn(this, _BasicType.call(this));

    _this.type = 'Option';
    return _this;
  }

  OptionType.prototype.render = function render() {
    var _props = this.props,
        type = _props.type,
        optionTypes = _props.optionTypes;

    return _react2["default"].createElement(_Select2["default"], {
      value: this.state.value,
      onChange: this.updateValue,
      options: optionTypes[type.replace('Option', '')]
    });
  };

  return OptionType;
}(_BasicType3["default"]);

OptionType.checkStruct = function () {
  return true;
};

exports["default"] = OptionType;