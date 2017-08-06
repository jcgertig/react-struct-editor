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

var _types = require('../utils/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var joinTypes = function joinTypes(props) {
  var joint = {};
  var types = (0, _getTypeProps2["default"])(props);
  Object.keys(types).forEach(function (key) {
    var type = (0, _lodash.capitalize)(key.replace('Types', ''));
    Object.keys(types[key]).forEach(function (innerKey) {
      var setKey = '' + innerKey + type;
      if (innerKey === '≤Default≥') {
        setKey = type;
      }
      joint[setKey] = types[key][type === 'option' ? '≤Default≥' : innerKey];
    });
  });
  return joint;
};

var Struct = function (_Component) {
  _inherits(Struct, _Component);

  function Struct() {
    _classCallCheck(this, Struct);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = { value: null };

    (0, _autoBind2["default"])(_this, []);
    return _this;
  }

  Struct.prototype.componentWillMount = function componentWillMount() {
    this.setState({ value: this.props.value });
  };

  Struct.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  };

  Struct.prototype.getType = function getType() {
    var _props = this.props,
        struct = _props.struct,
        collectionTypes = _props.collectionTypes;
    var value = this.state.value;


    var checkStruct = function checkStruct(structType, structDef, attr, types) {
      var name = structType.replace(attr, '') || '≤Default≥';
      return types[name].checkStruct(value, name, structDef);
    };

    var getFromSet = function getFromSet(attr) {
      var types = struct.type.filter(function (t) {
        return (0, _lodash.endsWith)(t, attr);
      });
      if (types.length > 0) {
        if (types.length === 1) {
          return types[0];
        }
        for (var _iterator = types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var colType = _ref;

          if (checkStruct(colType, struct[(0, _lodash.camelCase)(attr + 'Struct')], attr, collectionTypes)) {
            return colType;
          }
        }
      }
      return null;
    };

    if ((0, _lodash.isArray)(struct.type)) {
      if ((0, _lodash.isArray)(value)) {
        if (value.length > 1) {
          var types = (0, _lodash.uniq)(value.map(function (val) {
            return typeof val;
          }));
          if (types.length === 1 && (0, _lodash.isPlainObject)(value[0])) {
            var gotType = getFromSet('Collection');
            if (gotType !== null) {
              return gotType;
            }
          }
        }
        return getFromSet('Array') || '';
      } else if ((0, _lodash.isPlainObject)(value)) {
        var _gotType = getFromSet('Object');
        if (_gotType === 'Object' || _gotType === null) {
          var gotTypeTwo = getFromSet('KeyValue');
          if (gotTypeTwo === null && _gotType !== null) {
            return _gotType;
          }
          if (gotTypeTwo !== null) {
            return gotTypeTwo;
          }
        }
        if (_gotType !== null) {
          return _gotType;
        }
      } else {
        for (var _iterator2 = _types.BASIC_TYPES, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var basicType = _ref2;

          var _gotType2 = getFromSet(basicType);
          if (_gotType2 !== null) {
            return _gotType2;
          }
        }
      }
      return '';
    }
    return struct.type;
  };

  Struct.prototype.render = function render() {
    var type = this.getType();
    var Comp = joinTypes(this.props)[type]; // eslint-disable-line no-unused-vars
    return _react2["default"].createElement(Comp, _extends({ type: type }, this.props));
  };

  return Struct;
}(_react.Component);

Struct.propTypes = {
  value: _react.PropTypes.any,
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

exports["default"] = Struct;