'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _arrayToOptions = require('../utils/arrayToOptions');

var _arrayToOptions2 = _interopRequireDefault(_arrayToOptions);

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      type: null
    };

    (0, _autoBind2["default"])(_this, ['typeOf', 'updateValue', 'updateType']);
    return _this;
  }

  Input.prototype.componentWillMount = function componentWillMount() {
    var type = null;
    if ((0, _lodash.isArray)(this.typeOf())) {
      var valType = (0, _lodash.lowerCase)(typeof this.props.value);
      if (this.typeOf().indexOf(valType) > -1) {
        type = valType;
      } else {
        type = this.typeOf()[0];
      }
    }
    this.setState({ value: this.props.value, type: type });
  };

  Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var type = null;
    if ((0, _lodash.isArray)(this.typeOf())) {
      var valType = (0, _lodash.lowerCase)(typeof nextProps.value);
      if (valType === 'string') {
        valType = 'text';
      }
      if (this.typeOf().indexOf(valType) > -1) {
        type = valType;
      } else {
        type = this.typeOf()[0];
      }
    }
    this.setState({ value: nextProps.value, type: type });
  };

  Input.prototype.typeOf = function typeOf(type) {
    if ((0, _lodash.isArray)(this.props.struct.type)) {
      if ((0, _lodash.isUndefined)(type)) {
        return this.props.struct.type.map(function (t) {
          return (0, _lodash.lowerCase)(t);
        });
      }
      return type === 'optional';
    }
    var sType = (0, _lodash.lowerCase)(this.props.struct.type);
    if ((0, _lodash.isUndefined)(type)) {
      if (sType === 'id') {
        return 'text';
      }
      if (this.typeOf('option')) {
        return sType.replace(' option', '');
      }
      return sType;
    }
    if (type === 'select') {
      return (0, _lodash.has)(this.props.struct, 'options');
    }
    if (type === 'text') {
      return sType === 'text' || sType === 'id';
    }
    if (type === 'option') {
      return sType.indexOf('option') > 0;
    }
    return type === sType;
  };

  Input.prototype.updateValue = function updateValue(e) {
    var _this2 = this;

    var value = e.target.value;
    if (this.typeOf('boolean') || this.state.type === 'boolean') {
      value = (0, _lodash.isUndefined)(this.state.value) ? true : !this.state.value;
    }
    if (this.state.type === 'number') {
      value = (0, _lodash.toNumber)(value);
    }
    this.setState({ value: value }, function () {
      _this2.props.onChange(_this2.props.name, value);
    });
  };

  Input.prototype.updateType = function updateType(type) {
    var _this3 = this;

    var value = this.state.value;

    if (!(0, _lodash.isUndefined)(value) && this.state.type !== type) {
      if (type === 'boolean') {
        value = false;
      } else if (type === 'text') {
        value = (0, _lodash.toString)(value);
      } else if (type === 'number') {
        value = (0, _lodash.toNumber)(value);
      }
    }
    this.setState({ type: type, value: value }, function () {
      _this3.props.onChange(_this3.props.name, value);
    });
  };

  Input.prototype.render = function render() {
    var _this4 = this;

    var value = this.state.value;
    var _props = this.props,
        struct = _props.struct,
        optionTypes = _props.optionTypes;

    if (this.typeOf('boolean')) {
      return _react2["default"].createElement('input', {
        type: 'checkbox',
        style: { width: '100%', boxSizing: 'border-box' },
        checked: (0, _lodash.isUndefined)(value) ? false : value,
        onChange: this.updateValue
      });
    } else if (this.typeOf('select')) {
      return _react2["default"].createElement(_reactSelect2["default"], {
        options: struct.options,
        value: value,
        onChange: function onChange(val) {
          return _this4.updateValue({ target: { value: val.value } });
        }
      });
    } else if (this.typeOf('option')) {
      var options = optionTypes[this.typeOf()];
      return _react2["default"].createElement(_reactSelect2["default"], {
        options: options,
        value: value,
        onChange: function onChange(val) {
          return _this4.updateValue({ target: { value: val.value } });
        }
      });
    } else if (this.typeOf('optional')) {
      var _options = (0, _arrayToOptions2["default"])(this.typeOf());
      return _react2["default"].createElement(
        'div',
        null,
        _react2["default"].createElement(_reactSelect2["default"], {
          options: _options,
          value: this.state.type,
          onChange: function onChange(val) {
            return _this4.updateType(val.value);
          }
        }),
        this.state.type === 'boolean' && _react2["default"].createElement('input', {
          type: 'checkbox',
          style: { width: '100%', boxSizing: 'border-box' },
          checked: (0, _lodash.isUndefined)(value) ? false : value,
          onChange: this.updateValue
        }),
        this.state.type !== 'boolean' && _react2["default"].createElement(
          'div',
          { className: 'Select' },
          _react2["default"].createElement('input', {
            key: this.state.type,
            type: this.state.type,
            autoComplete: 'off',
            className: 'Select-control Input',
            value: value,
            onChange: this.updateValue
          })
        )
      );
    }
    return _react2["default"].createElement(
      'div',
      { className: 'Select' },
      _react2["default"].createElement('input', {
        type: this.typeOf(),
        autoComplete: 'off',
        className: 'Select-control Input',
        value: value,
        onChange: this.updateValue
      })
    );
  };

  return Input;
}(_react.Component);

Input.propTypes = {
  value: _react.PropTypes.any,
  onChange: _react.PropTypes.func,
  name: _react.PropTypes.any.isRequired,
  struct: _react.PropTypes.any.isRequired,
  optionTypes: _react.PropTypes.object.isRequired
};

exports["default"] = Input;