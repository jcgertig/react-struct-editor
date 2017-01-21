'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _Accordion = require('./Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _KeyValueEditor = require('./KeyValueEditor');

var _KeyValueEditor2 = _interopRequireDefault(_KeyValueEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectEditor = function (_Component) {
  _inherits(ObjectEditor, _Component);

  function ObjectEditor() {
    _classCallCheck(this, ObjectEditor);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      value: {}
    };

    (0, _autoBind2["default"])(_this, ['updateValue', 'updatePair', 'updateState', 'updateCollectionOrder']);
    return _this;
  }

  ObjectEditor.prototype.componentWillMount = function componentWillMount() {
    var value = this.props.value;

    value = this.props.struct.type === 'KeyValue' ? (0, _lodash.toPairs)(value) : value;
    this.setState({ value: value });
  };

  ObjectEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;

    value = nextProps.struct.type === 'KeyValue' ? (0, _lodash.toPairs)(value) : value;
    this.setState({ value: value });
  };

  ObjectEditor.prototype.updateValue = function updateValue() {
    var value = this.state.value;

    if (this.props.struct.type === 'Object') {
      this.props.onChange(this.props.name, value);
    } else {
      var data = {};
      for (var _iterator = value, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
      this.props.onChange(this.props.name, data);
    }
  };

  ObjectEditor.prototype.updatePair = function updatePair(index, data) {
    var _cloneDeep = (0, _lodash.cloneDeep)(this.state),
        value = _cloneDeep.value;

    value[index] = data;
    this.setState({ value: value }, this.updateValue);
  };

  ObjectEditor.prototype.updateState = function updateState(value) {
    this.setState({ value: value }, this.updateValue);
  };

  ObjectEditor.prototype.updateCollectionOrder = function updateCollectionOrder(newOrder) {
    this.props.updateCollectionOrder(this.props.name, newOrder);
  };

  ObjectEditor.prototype.render = function render() {
    var _this2 = this;

    var struct = this.props.struct;


    var renderKeyValuePairs = function renderKeyValuePairs() {
      var value = _this2.state.value;
      var _props = _this2.props,
          optionTypes = _props.optionTypes,
          collectionTypes = _props.collectionTypes;


      if (struct.type === 'KeyValue') {
        return value.map(function (val, i) {
          return _react2["default"].createElement(_KeyValueEditor2["default"], {
            key: i,
            data: val,
            struct: struct,
            optionTypes: optionTypes,
            updateData: _this2.updatePair
          });
        });
      } else if (struct.type === 'Object') {
        return _react2["default"].createElement(_KeyValueEditor2["default"], {
          data: value,
          struct: struct,
          optionTypes: optionTypes,
          updateData: _this2.updateState,
          collectionTypes: collectionTypes
        });
      }
    };

    if (struct.type === 'Object') {
      return renderKeyValuePairs();
    }

    return _react2["default"].createElement(
      _Accordion2["default"],
      {
        orderable: (0, _lodash.has)(struct, 'orderable') ? struct.orderable : true,
        reorder: this.updateCollectionOrder
      },
      renderKeyValuePairs()
    );
  };

  return ObjectEditor;
}(_react.Component);

ObjectEditor.propTypes = {
  value: _react.PropTypes.any,
  onChange: _react.PropTypes.func,
  name: _react.PropTypes.any.isRequired,
  struct: _react.PropTypes.any.isRequired,
  collectionTypes: _react.PropTypes.object,
  updateCollectionOrder: _react.PropTypes.func,
  optionTypes: _react.PropTypes.object.isRequired
};

exports["default"] = ObjectEditor;