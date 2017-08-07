'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ObjectEditor = require('./ObjectEditor');

var _ObjectEditor2 = _interopRequireDefault(_ObjectEditor);

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


var StructEditor = function (_Component) {
  _inherits(StructEditor, _Component);

  function StructEditor() {
    _classCallCheck(this, StructEditor);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StructEditor.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        struct = _props.struct,
        data = _props.data,
        setData = _props.setData,
        buttonClass = _props.buttonClass,
        inputClass = _props.inputClass,
        labelClass = _props.labelClass;


    if (struct.type === 'Object') {
      var _ret = function () {
        var typeProps = {};
        Object.keys(_Types2["default"]).forEach(function (key) {
          typeProps[key + 'Types'] = (0, _lodash.assign)({}, _this2.props[key + 'Types'], { '≤Default≥': _Types2["default"][key] });
        });

        return {
          v: _react2["default"].createElement(_ObjectEditor2["default"], _extends({
            value: data,
            struct: struct,
            onChange: setData,
            top: true,
            displayProps: {
              buttonClass: buttonClass,
              inputClass: inputClass,
              labelClass: labelClass
            }
          }, typeProps))
        };
      }();

      if (typeof _ret === "object") return _ret.v;
    } else {
      return _react2["default"].createElement(
        'div',
        null,
        'Alert! Struct has to start with an Object type!'
      );
    }
  };

  return StructEditor;
}(_react.Component);

StructEditor.propTypes = {
  updateRef: _react.PropTypes.func,
  optionTypes: _react.PropTypes.object,
  collectionTypes: _react.PropTypes.object,
  buttonClass: _react.PropTypes.string,
  inputClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  data: _react.PropTypes.object.isRequired,
  setData: _react.PropTypes.func.isRequired,
  struct: _react.PropTypes.object.isRequired
};

StructEditor.defaultProps = {
  textTypes: {},
  arrayTypes: {},
  numberTypes: {},
  optionTypes: {},
  objectTypes: {},
  booleanTypes: {},
  keyValueTypes: {},
  collectionTypes: {},
  updateRef: function updateRef() {}
};

exports["default"] = StructEditor;