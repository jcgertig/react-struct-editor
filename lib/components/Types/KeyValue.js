'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicType2 = require('./BasicType');

var _BasicType3 = _interopRequireDefault(_BasicType2);

var _lodash = require('lodash');

var _getTypeProps = require('../../utils/getTypeProps');

var _getTypeProps2 = _interopRequireDefault(_getTypeProps);

var _autoBind = require('../../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Struct = require('../Struct');

var _Struct2 = _interopRequireDefault(_Struct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
// eslint-disable-line no-unused-vars


// eslint-disable-line no-unused-vars

var KeyValueType = function (_BasicType) {
  _inherits(KeyValueType, _BasicType);

  function KeyValueType() {
    _classCallCheck(this, KeyValueType);

    var _this = _possibleConstructorReturn(this, _BasicType.call(this));

    _this.state = {
      value: []
    };

    _this.type = 'KeyValue';

    (0, _autoBind2["default"])(_this, ['handleChange', 'renderKeyValuePairs', 'updatePair', 'updateCollectionOrder', 'renderKeyInput', 'renderValInput']);
    return _this;
  }

  KeyValueType.prototype.componentWillMount = function componentWillMount() {
    this.setState({ value: (0, _lodash.toPairs)(this.props.value) });
  };

  KeyValueType.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ value: (0, _lodash.toPairs)(nextProps.value) });
  };

  KeyValueType.prototype.handleChange = function handleChange() {
    var data = {};
    for (var _iterator = this.state.value, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var val = _ref;

      data[val[0]] = val[1];
    }
    this.props.onChange(data);
  };

  KeyValueType.prototype.updatePair = function updatePair(index, indexTwo, data) {
    var _cloneDeep = (0, _lodash.cloneDeep)(this.state),
        value = _cloneDeep.value;

    value[index][indexTwo] = data;
    this.setState({ value: value }, this.handleChange);
  };

  KeyValueType.prototype.updateCollectionOrder = function updateCollectionOrder(newOrder) {
    var value = [];
    for (var _iterator2 = newOrder, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var order = _ref2;

      value.push(this.state.value[parseInt(order, 10)]);
    }
    this.setState({ value: value }, this.handleChange);
  };

  KeyValueType.prototype.renderKeyInput = function renderKeyInput(index) {
    var struct = this.props.struct;

    return _react2["default"].createElement(
      'div',
      { key: index, style: { marginTop: '25px' } },
      _react2["default"].createElement(
        'label',
        null,
        struct.keyStruct.label
      ),
      _react2["default"].createElement('br', null),
      _react2["default"].createElement(_Struct2["default"], _extends({
        key: index,
        struct: struct.keyStruct,
        value: this.state.value[index][0],
        onChange: this.updatePair.bind(this, index, 0),
        displayProps: this.props.displayProps
      }, (0, _getTypeProps2["default"])(this.props)))
    );
  };

  KeyValueType.prototype.renderValInput = function renderValInput(index) {
    var struct = this.getStruct();
    return _react2["default"].createElement(
      'div',
      { key: index, style: { marginTop: '25px' } },
      _react2["default"].createElement(_Struct2["default"], _extends({
        key: index,
        struct: struct,
        value: this.state.value[index][1],
        onChange: this.updatePair.bind(this, index, 1),
        displayProps: this.props.displayProps
      }, (0, _getTypeProps2["default"])(this.props)))
    );
  };

  KeyValueType.prototype.renderKeyValuePairs = function renderKeyValuePairs() {
    var _this2 = this;

    var _props$struct = this.props.struct,
        header = _props$struct.header,
        props = _objectWithoutProperties(_props$struct, ['header']);

    return this.state.value.map(function (val, index) {
      if (!(0, _lodash.isUndefined)(header)) {
        if ((0, _lodash.isString)(header) && (0, _lodash.has)(val, header)) {
          header = val[header];
        } else if ((0, _lodash.isFunction)(header)) {
          header = header(val, index);
        }
      } else {
        header = 'No header attr update struct.';
      }

      return _react2["default"].createElement(
        _Panel2["default"],
        _extends({ key: index, header: header }, props),
        _react2["default"].createElement(
          'div',
          { style: { marginTop: '25px' } },
          _this2.renderKeyInput(index),
          _this2.renderValInput(index)
        )
      );
    });
  };

  KeyValueType.prototype.render = function render() {
    var _props = this.props,
        struct = _props.struct,
        displayProps = _props.displayProps;

    return _react2["default"].createElement(
      'div',
      { style: { marginTop: '25px' } },
      _react2["default"].createElement(
        'label',
        { style: { marginBottom: 10 }, className: displayProps.labelClass },
        struct.label
      ),
      _react2["default"].createElement(
        _Accordion2["default"],
        {
          orderable: (0, _lodash.has)(struct, 'orderable') ? struct.orderable : true,
          reorder: this.updateCollectionOrder
        },
        this.renderKeyValuePairs()
      )
    );
  };

  return KeyValueType;
}(_BasicType3["default"]);

KeyValueType.checkStruct = function (value) {
  return (0, _lodash.isPlainObject)(value);
};

exports["default"] = KeyValueType;