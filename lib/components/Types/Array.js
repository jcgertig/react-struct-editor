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

var _defaultFromStruct = require('../../utils/defaultFromStruct');

var _defaultFromStruct2 = _interopRequireDefault(_defaultFromStruct);

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

var ArrayType = function (_BasicType) {
  _inherits(ArrayType, _BasicType);

  function ArrayType() {
    _classCallCheck(this, ArrayType);

    var _this = _possibleConstructorReturn(this, _BasicType.call(this));

    _this.state = {
      value: []
    };

    _this.type = 'Array';

    (0, _autoBind2["default"])(_this, ['handleChange', 'updateIndex', 'updateCollectionOrder', 'renderIndexs', 'handleAdd', 'handleRemove']);
    return _this;
  }

  ArrayType.prototype.handleChange = function handleChange() {
    this.props.onChange(this.state.value);
  };

  ArrayType.prototype.updateIndex = function updateIndex(index, data) {
    var _cloneDeep = (0, _lodash.cloneDeep)(this.state),
        value = _cloneDeep.value;

    value[index] = data;
    this.setState({ value: value }, this.handleChange);
  };

  ArrayType.prototype.updateCollectionOrder = function updateCollectionOrder(newOrder) {
    var value = [];
    for (var _iterator = newOrder, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var order = _ref;

      value.push(this.state.value[parseInt(order, 10)]);
    }
    this.setState({ value: value }, this.handleChange);
  };

  ArrayType.prototype.handleAdd = function handleAdd() {
    var value = this.state.value;

    var struct = this.getStruct();
    if (typeof value === 'undefined') {
      value = [];
    }
    value.push((0, _defaultFromStruct2["default"])(struct));
    this.setState({ value: value });
  };

  ArrayType.prototype.handleRemove = function handleRemove(index) {
    var value = this.state.value;

    value.splice(index, 1);
    this.setState({ value: value });
  };

  ArrayType.prototype.renderIndexs = function renderIndexs() {
    var _this2 = this;

    var _props = this.props,
        _props$struct = _props.struct,
        header = _props$struct.header,
        props = _objectWithoutProperties(_props$struct, ['header']),
        displayProps = _props.displayProps;

    var struct = this.getStruct();

    return this.state.value.map(function (val, index) {
      var headerText = '';
      if (!(0, _lodash.isUndefined)(header)) {
        if ((0, _lodash.isString)(header) && (0, _lodash.has)(val, header)) {
          headerText = val[header];
        } else if ((0, _lodash.isFunction)(header)) {
          headerText = header(val, index);
        }
      } else {
        headerText = 'No header attr update struct.';
      }

      return _react2["default"].createElement(
        _Panel2["default"],
        _extends({ key: index, header: headerText }, props),
        _react2["default"].createElement(_Struct2["default"], _extends({
          key: index,
          value: val,
          struct: struct,
          onChange: _this2.updateIndex.bind(_this2, index)
        }, (0, _getTypeProps2["default"])(_this2.props))),
        _react2["default"].createElement(
          'button',
          {
            style: { marginTop: 25 },
            className: displayProps.buttonClass,
            onClick: function onClick() {
              return _this2.handleRemove(index);
            }
          },
          (0, _lodash.has)(struct, 'removeText') ? struct.removeText : 'Remove Item'
        )
      );
    });
  };

  ArrayType.prototype.render = function render() {
    var _props2 = this.props,
        struct = _props2.struct,
        displayProps = _props2.displayProps;

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
        this.renderIndexs()
      ),
      _react2["default"].createElement(
        'button',
        {
          style: { marginTop: 25 },
          onClick: this.handleAdd,
          className: displayProps.buttonClass
        },
        (0, _lodash.has)(struct, 'addText') ? struct.addText : 'Add Item'
      )
    );
  };

  return ArrayType;
}(_BasicType3["default"]);

ArrayType.checkStruct = function (value) {
  return (0, _lodash.isArray)(value);
};

exports["default"] = ArrayType;