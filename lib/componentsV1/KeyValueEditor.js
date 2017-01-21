'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _StructEditor = require('./StructEditor');

var _StructEditor2 = _interopRequireDefault(_StructEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyValueEditor = function (_Component) {
  _inherits(KeyValueEditor, _Component);

  function KeyValueEditor() {
    _classCallCheck(this, KeyValueEditor);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      data: {}
    };

    (0, _autoBind2["default"])(_this, ['updateValue', 'renderKeyInput', 'renderValInput']);
    return _this;
  }

  KeyValueEditor.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        data = _props.data,
        struct = _props.struct;

    if ((0, _lodash.isUndefined)(data)) {
      this.setState({ data: struct.type === 'Object' ? {} : [] });
    } else {
      this.setState({ data: data });
    }
  };

  KeyValueEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  };

  KeyValueEditor.prototype.updateValue = function updateValue(index, val) {
    var data = this.state.data;

    data[index] = val;
    this.props.updateData(this.props.index, data);
  };

  KeyValueEditor.prototype.renderKeyInput = function renderKeyInput() {
    var struct = this.props.struct;

    return _react2["default"].createElement(
      'div',
      { style: { marginTop: '25px' } },
      _react2["default"].createElement(
        'label',
        null,
        struct.keyStruct.label
      ),
      _react2["default"].createElement('br', null),
      _react2["default"].createElement(_Input2["default"], {
        name: 0,
        struct: struct.keyStruct,
        value: this.state.data[0],
        onChange: this.updateValue,
        optionTypes: this.props.optionTypes
      })
    );
  };

  KeyValueEditor.prototype.renderValInput = function renderValInput() {
    var _props2 = this.props,
        struct = _props2.struct,
        optionTypes = _props2.optionTypes,
        collectionTypes = _props2.collectionTypes,
        updateData = _props2.updateData;

    if (struct.type === 'KeyValue') {
      return _react2["default"].createElement(
        'div',
        { style: { marginTop: '25px' } },
        _react2["default"].createElement(
          'label',
          null,
          struct.valueStruct.label
        ),
        _react2["default"].createElement('br', null),
        _react2["default"].createElement(_Input2["default"], {
          name: 1,
          struct: struct.valueStruct,
          value: this.state.data[1],
          onChange: this.updateValue,
          optionTypes: this.props.optionTypes
        })
      );
    } else if (struct.type === 'Object') {
      return _react2["default"].createElement(_StructEditor2["default"], {
        struct: struct,
        data: this.state.data,
        setData: updateData,
        optionTypes: optionTypes,
        collectionTypes: collectionTypes
      });
    }
  };

  KeyValueEditor.prototype.render = function render() {
    var struct = this.props.struct;

    if (struct.type === 'Object') {
      return _react2["default"].createElement(
        'div',
        { style: { marginTop: '25px' } },
        struct.type === 'KeyValue' && this.renderKeyInput(),
        this.renderValInput()
      );
    }

    var header = 'No header attr update struct.';
    if ((0, _lodash.has)(struct, 'header')) {
      if ((0, _lodash.isString)(struct.header) && (0, _lodash.has)(this.state.data, struct.header)) {
        header = this.state.data[struct.header];
      } else if ((0, _lodash.isFunction)(struct.header)) {
        header = struct.header(this.state.data, parseInt(this.props.index, 10));
      }
    }
    return _react2["default"].createElement(
      _Panel2["default"],
      _extends({}, this.props, { header: header }),
      _react2["default"].createElement(
        'div',
        { style: { marginTop: '25px' } },
        struct.type === 'KeyValue' && this.renderKeyInput(),
        this.renderValInput()
      )
    );
  };

  return KeyValueEditor;
}(_react.Component);

KeyValueEditor.propTypes = {
  data: _react.PropTypes.any,
  updateData: _react.PropTypes.func,
  optionTypes: _react.PropTypes.object,
  struct: _react.PropTypes.any.isRequired,
  collectionTypes: _react.PropTypes.object,

  index: _react.PropTypes.any,
  openPanel: _react.PropTypes.func,
  isOpen: _react.PropTypes.any
};

exports["default"] = KeyValueEditor;