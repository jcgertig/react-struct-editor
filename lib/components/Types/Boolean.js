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

var BooleanType = function (_BasicType) {
  _inherits(BooleanType, _BasicType);

  function BooleanType() {
    _classCallCheck(this, BooleanType);

    var _this = _possibleConstructorReturn(this, _BasicType.call(this));

    _this.type = 'Boolean';

    _this.updateValue = function () {
      _this.props.onChange(!_this.state.value);
    };
    return _this;
  }

  BooleanType.prototype.render = function render() {
    return _react2["default"].createElement('input', {
      type: 'checkbox',
      onChange: this.updateValue,
      style: { width: '100%', boxSizing: 'border-box' },
      checked: (0, _lodash.isUndefined)(this.state.value) ? false : this.state.value
    });
  };

  return BooleanType;
}(_BasicType3["default"]);

BooleanType.checkStruct = function (value) {
  return (0, _lodash.isBoolean)(value);
};

exports["default"] = BooleanType;