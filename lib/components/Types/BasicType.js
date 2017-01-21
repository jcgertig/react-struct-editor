'use strict';

exports.__esModule = true;

var _react = require('react');

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicType = function (_Component) {
  _inherits(BasicType, _Component);

  function BasicType() {
    _classCallCheck(this, BasicType);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = { value: null };

    _this.type = 'Basic';

    _this.getStruct = function () {
      var structBase = _this.props.struct[(0, _lodash.camelCase)(_this.type + 'Struct')];
      if (!(0, _lodash.has)(structBase, '≤Default≥')) {
        return structBase;
      }
      var type = _this.props.type === _this.type ? '≤Default≥' : _this.props.type;
      return structBase[type];
    };

    _this.updateValue = function (e) {
      _this.props.onChange(e.target.value);
    };
    return _this;
  }

  BasicType.prototype.componentWillMount = function componentWillMount() {
    this.setState({ value: this.props.value });
  };

  BasicType.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  };

  return BasicType;
}(_react.Component);

BasicType.checkStruct = function (value, struct) {
  console.log(value, struct); // eslint-disable-line
  return true;
};

BasicType.propTypes = {
  value: _react.PropTypes.any.isRequired,
  type: _react.PropTypes.string.isRequired,
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

BasicType.defaultProps = {
  struct: {},
  onChange: function onChange() {}
};

exports["default"] = BasicType;