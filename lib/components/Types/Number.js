'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicType2 = require('./BasicType');

var _BasicType3 = _interopRequireDefault(_BasicType2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberType = function (_BasicType) {
  _inherits(NumberType, _BasicType);

  function NumberType() {
    _classCallCheck(this, NumberType);

    var _this = _possibleConstructorReturn(this, _BasicType.call(this));

    _this.type = 'KeyValue';

    _this.updateValue = function (e) {
      _this.props.onChange((0, _lodash.toNumber)(e.target.value));
    };
    return _this;
  }

  NumberType.prototype.render = function render() {
    return _react2["default"].createElement(
      'div',
      { style: { marginTop: 25 } },
      _react2["default"].createElement(
        'label',
        { style: { marginBottom: 10 }, className: this.props.displayProps.labelClass },
        this.props.struct.label
      ),
      _react2["default"].createElement(
        'div',
        { className: 'Select' },
        _react2["default"].createElement('input', {
          type: 'number',
          autoComplete: 'off',
          value: this.state.value,
          onChange: this.updateValue,
          className: 'Select-control Input ' + this.props.displayProps.inputClass
        })
      )
    );
  };

  return NumberType;
}(_BasicType3["default"]);

NumberType.checkStruct = function (value) {
  return (0, _lodash.isNumber)(value);
};

exports["default"] = NumberType;