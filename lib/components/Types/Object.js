'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicType2 = require('./BasicType');

var _BasicType3 = _interopRequireDefault(_BasicType2);

var _lodash = require('lodash');

var _ObjectEditor = require('../ObjectEditor');

var _ObjectEditor2 = _interopRequireDefault(_ObjectEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line

var ObjectType = function (_BasicType) {
  _inherits(ObjectType, _BasicType);

  function ObjectType() {
    _classCallCheck(this, ObjectType);

    var _this = _possibleConstructorReturn(this, _BasicType.call(this));

    _this.type = 'Object';
    return _this;
  }

  ObjectType.prototype.render = function render() {
    if (!this.props.top) {
      return _react2["default"].createElement(
        'div',
        null,
        _react2["default"].createElement(
          'label',
          null,
          this.props.struct.label
        ),
        _react2["default"].createElement('br', null),
        _react2["default"].createElement(_ObjectEditor2["default"], this.props)
      );
    }
    return _react2["default"].createElement(_ObjectEditor2["default"], this.props);
  };

  return ObjectType;
}(_BasicType3["default"]);

ObjectType.checkStruct = function (value) {
  return (0, _lodash.isPlainObject)(value);
};

exports["default"] = ObjectType;