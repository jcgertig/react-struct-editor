'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _getTypeProps = require('../utils/getTypeProps');

var _getTypeProps2 = _interopRequireDefault(_getTypeProps);

var _Struct = require('./Struct');

var _Struct2 = _interopRequireDefault(_Struct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line

var ObjectEditor = function (_Component) {
  _inherits(ObjectEditor, _Component);

  function ObjectEditor() {
    _classCallCheck(this, ObjectEditor);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {};

    (0, _autoBind2["default"])(_this, ['updateStateKey', 'createChangeHandler']);
    return _this;
  }

  ObjectEditor.prototype.componentWillMount = function componentWillMount() {
    this.setState(this.props.value);
  };

  ObjectEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value);
  };

  ObjectEditor.prototype.updateStateKey = function updateStateKey(key, val) {
    var _setState,
        _this2 = this;

    this.setState((_setState = {}, _setState[key] = val, _setState), function () {
      return _this2.props.onChange(_this2.state);
    });
  };

  ObjectEditor.prototype.createChangeHandler = function createChangeHandler(key) {
    return this.updateStateKey.bind(this, key);
  };

  ObjectEditor.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        objectStruct = _props.struct.objectStruct,
        displayProps = _props.displayProps;

    var value = (0, _lodash.cloneDeep)(this.state);

    return _react2["default"].createElement(
      'div',
      null,
      Object.keys(objectStruct).map(function (key, index) {
        return _react2["default"].createElement(_Struct2["default"], _extends({
          key: index,
          value: value[key],
          struct: objectStruct[key],
          onChange: _this3.createChangeHandler(key),
          displayProps: displayProps
        }, (0, _getTypeProps2["default"])(_this3.props)));
      })
    );
  };

  return ObjectEditor;
}(_react.Component);

ObjectEditor.propTypes = {
  value: _react.PropTypes.object,
  struct: _react.PropTypes.object.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  textTypes: _react.PropTypes.object.isRequired,
  arrayTypes: _react.PropTypes.object.isRequired,
  numberTypes: _react.PropTypes.object.isRequired,
  optionTypes: _react.PropTypes.object.isRequired,
  objectTypes: _react.PropTypes.object.isRequired,
  booleanTypes: _react.PropTypes.object.isRequired,
  keyValueTypes: _react.PropTypes.object.isRequired,
  collectionTypes: _react.PropTypes.object.isRequired
};

exports["default"] = ObjectEditor;