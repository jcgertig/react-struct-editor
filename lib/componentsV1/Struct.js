'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _defaultFromStruct = require('../utils/defaultFromStruct');

var _defaultFromStruct2 = _interopRequireDefault(_defaultFromStruct);

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _warning = require('../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

var _Accordion = require('./Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _ObjectEditor = require('./ObjectEditor');

var _ObjectEditor2 = _interopRequireDefault(_ObjectEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectionTypes = ['KeyValue', 'Object', 'Collection', 'Array'];

var Struct = function (_Component) {
  _inherits(Struct, _Component);

  function Struct() {
    _classCallCheck(this, Struct);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      struct: {}
    };

    (0, _autoBind2["default"])(_this, ['updateStateKey', 'updateStateIndex', 'updateCollection', 'updateCollectionOrder', 'updateState', 'addToCollection', 'removeFromCollection', 'handleRemoveClick', 'renderNonCollections', 'renderCollection', 'renderCollections']);
    return _this;
  }

  Struct.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        struct = _props.struct,
        data = _props.data;

    this.setState({ struct: Object.assign({}, (0, _defaultFromStruct2["default"])(struct.struct), data) });
  };

  Struct.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ struct: Object.assign({}, this.state.struct, nextProps.data) });
  };

  Struct.prototype.updateStateKey = function updateStateKey(key, val) {
    var _Object$assign;

    this.setState({ struct: Object.assign({}, this.state.struct, (_Object$assign = {}, _Object$assign[key] = val, _Object$assign)) });
  };

  Struct.prototype.updateStateIndex = function updateStateIndex(key, index, val) {
    var struct = this.state.struct;

    var data = (0, _lodash.cloneDeep)(struct[key]);
    data[index] = val;
    struct[key] = data;
    this.setState({ struct: struct });
  };

  Struct.prototype.updateCollection = function updateCollection(key, val, index) {
    var _Object$assign2;

    var needsUpdate = false;
    var data = (0, _lodash.cloneDeep)(this.state.struct[key]);
    var current = (0, _lodash.cloneDeep)(data[index]);

    var struct = this.props.struct.struct;

    var idAttr = (0, _lodash.findKey)(struct[key].struct, { type: 'Id' });
    if (!(0, _lodash.isUndefined)(idAttr) && current[idAttr] !== val[idAttr]) {
      var _find;

      if (!(0, _lodash.isUndefined)((0, _lodash.find)(data, (_find = {}, _find[idAttr] = val[idAttr], _find)))) {
        alert('Id types must be unique. (' + idAttr + ')'); // eslint-disable-line
        return;
      }
      needsUpdate = true;
    }

    data[index] = val;
    this.props.updateData(Object.assign({}, this.state.struct, (_Object$assign2 = {}, _Object$assign2[key] = data, _Object$assign2)), this.props.index);
    if (needsUpdate) {
      this.props.updateRef({ currentId: current[idAttr], newId: val[idAttr] });
    }
  };

  Struct.prototype.updateCollectionOrder = function updateCollectionOrder(key, newOrder) {
    var _Object$assign3;

    var collection = (0, _lodash.cloneDeep)(this.state.struct[key]);

    var data = [];
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

      data.push(collection[parseInt(order, 10)]);
    }

    this.props.updateData(Object.assign({}, this.state.struct, (_Object$assign3 = {}, _Object$assign3[key] = data, _Object$assign3)), this.props.index);
  };

  Struct.prototype.updateState = function updateState() {
    this.props.updateData(this.state.struct, this.props.index);
  };

  Struct.prototype.addToCollection = function addToCollection(key) {
    var _Object$assign4;

    var struct = this.props.struct;

    var data = (0, _lodash.cloneDeep)(this.state.struct[key]);
    var s = struct;
    if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type') && (s[key].type === 'KeyValue' || s[key].type === 'Object')) {
      data[''] = undefined;
    } else if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type') && s[key].type === 'Array') {
      data.push(s[key].struct["default"]);
    } else if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type')) {
      data.push((0, _defaultFromStruct2["default"])(s[key].struct));
    } else {
      s = s.struct;
      if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type') && (s[key].type === 'KeyValue' || s[key].type === 'Object')) {
        data[''] = undefined;
      } else if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type') && s[key].type === 'Array') {
        data.push(s[key].struct["default"]);
      } else if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type')) {
        data.push((0, _defaultFromStruct2["default"])(s[key].struct));
      } else {
        data.push((0, _defaultFromStruct2["default"])(s[key].struct));
      }
    }
    this.props.updateData(Object.assign({}, this.state.struct, (_Object$assign4 = {}, _Object$assign4[key] = data, _Object$assign4)), this.props.index);
  };

  Struct.prototype.removeFromCollection = function removeFromCollection(key, index) {
    var _Object$assign5;

    var struct = this.state.struct;

    var data = (0, _lodash.cloneDeep)(struct[key]);
    (0, _lodash.pullAt)(data, [index]);
    this.props.updateData(Object.assign({}, this.state.struct, (_Object$assign5 = {}, _Object$assign5[key] = data, _Object$assign5)), this.props.index);
  };

  Struct.prototype.handleRemoveClick = function handleRemoveClick() {
    var _props2 = this.props,
        removeFromCollection = _props2.removeFromCollection,
        attr = _props2.attr,
        index = _props2.index;

    removeFromCollection(attr, index);
  };

  Struct.prototype.renderNonCollections = function renderNonCollections(_ref2) {
    var _this2 = this;

    var struct = _ref2.struct,
        hideAfter = _ref2.hideAfter;

    var beforeHide = -1;
    if (!(0, _lodash.isUndefined)(hideAfter)) {
      beforeHide = hideAfter;
    }
    if (!(0, _lodash.isUndefined)(struct)) {
      var _ret = function () {
        var keys = Object.keys(struct);
        var isNonCollection = function isNonCollection(key) {
          var notCollection = function notCollection(k) {
            return CollectionTypes.indexOf(struct[k].type) < 0;
          };
          return struct[key].type.indexOf('Collection') < 0 && notCollection(key);
        };
        keys = keys.filter(isNonCollection);

        var rendered = [];
        if (beforeHide !== -1) {
          var _ret2 = function () {
            keys.slice(0, beforeHide + 1).map(function (key, i) {
              rendered.push(_react2["default"].createElement(
                'div',
                { key: i, style: { marginTop: '25px' } },
                _react2["default"].createElement(
                  'label',
                  null,
                  struct[key].label
                ),
                _react2["default"].createElement('br', null),
                _react2["default"].createElement(_Input2["default"], {
                  name: key,
                  struct: struct[key],
                  value: _this2.state.struct[key],
                  onChange: _this2.updateStateKey,
                  optionTypes: _this2.props.optionTypes
                })
              ));
            });
            var insidePanel = [];
            keys.slice(beforeHide + 1).map(function (key, i) {
              insidePanel.push(_react2["default"].createElement(
                'div',
                { key: i, style: { marginTop: '25px' } },
                _react2["default"].createElement(
                  'label',
                  null,
                  struct[key].label
                ),
                _react2["default"].createElement('br', null),
                _react2["default"].createElement(_Input2["default"], {
                  name: key,
                  struct: struct[key],
                  value: _this2.state.struct[key],
                  onChange: _this2.updateStateKey,
                  optionTypes: _this2.props.optionTypes
                })
              ));
            });
            rendered.push(_react2["default"].createElement(
              _Accordion2["default"],
              { key: beforeHide + 1 },
              _react2["default"].createElement(
                _Panel2["default"],
                { header: 'Other' },
                insidePanel
              )
            ));
            return {
              v: {
                v: rendered
              }
            };
          }();

          if (typeof _ret2 === "object") return _ret2.v;
        }
        return {
          v: keys.map(function (key, i) {
            return _react2["default"].createElement(
              'div',
              { key: i, style: { marginTop: '25px' } },
              _react2["default"].createElement(
                'label',
                null,
                struct[key].label
              ),
              _react2["default"].createElement('br', null),
              _react2["default"].createElement(_Input2["default"], {
                name: key,
                struct: struct[key],
                value: _this2.state.struct[key],
                onChange: _this2.updateStateKey,
                optionTypes: _this2.props.optionTypes
              })
            );
          })
        };
      }();

      if (typeof _ret === "object") return _ret.v;
    }
  };

  Struct.prototype.renderCollection = function renderCollection(struct, key) {
    var _this3 = this;

    var _props3 = this.props,
        updateRef = _props3.updateRef,
        optionTypes = _props3.optionTypes,
        collectionTypes = _props3.collectionTypes;

    if (struct.type === 'Collection') {
      return this.state.struct[key].map(function (value, i) {
        return _react2["default"].createElement(Struct, {
          key: i,
          attr: key,
          data: value,
          struct: struct,
          updateRef: updateRef,
          optionTypes: optionTypes,
          collectionTypes: collectionTypes,
          removeFromCollection: _this3.removeFromCollection,
          updateData: _this3.updateCollection.bind(_this3, key)
        });
      });
    } else if (struct.type.indexOf('Collection') > -1) {
      var _ret3 = function () {
        var Comp = collectionTypes[struct.type.replace('Collection', '')];
        if (!(0, _lodash.isUndefined)(Comp)) {
          return {
            v: _this3.state.struct[key].map(function (value, i) {
              return _react2["default"].createElement(Comp, {
                key: i,
                attr: key,
                data: value,
                struct: struct,
                optionTypes: optionTypes,
                collectionTypes: collectionTypes,
                removeFromCollection: _this3.removeFromCollection,
                updateData: _this3.updateCollection.bind(_this3, key)
              });
            })
          };
        }
      }();

      if (typeof _ret3 === "object") return _ret3.v;
    } else if (struct.type === 'KeyValue' || struct.type === 'Object') {
      return _react2["default"].createElement(_ObjectEditor2["default"], {
        name: key,
        struct: struct,
        optionTypes: optionTypes,
        value: this.state.struct[key],
        onChange: this.updateStateKey,
        collectionTypes: collectionTypes,
        updateCollectionOrder: this.updateCollectionOrder
      });
    } else if (struct.type === 'Array') {
      return this.state.struct[key].map(function (val, i) {
        return _react2["default"].createElement(
          _Panel2["default"],
          {
            key: i,
            header: i + 1 + ' - ' + val
          },
          _react2["default"].createElement(
            'div',
            { style: { marginBottom: 15, marginTop: 25 } },
            _react2["default"].createElement(
              'label',
              null,
              struct.struct.label
            ),
            _react2["default"].createElement('br', null),
            _react2["default"].createElement(_Input2["default"], {
              name: i,
              value: val,
              struct: struct.struct,
              onChange: _this3.updateStateIndex.bind(_this3, key),
              optionTypes: _this3.props.optionTypes
            })
          ),
          _react2["default"].createElement(
            'button',
            { onClick: _this3.removeFromCollection.bind(_this3, key, i) },
            'Remove ',
            (0, _pluralize2["default"])(struct.struct.label, 1)
          )
        );
      });
    }
  };

  Struct.prototype.renderCollections = function renderCollections(_ref3) {
    var _this4 = this;

    var struct = _ref3.struct;

    if (!(0, _lodash.isUndefined)(struct)) {
      var _ret4 = function () {
        var isObject = function isObject(key) {
          return CollectionTypes.indexOf(struct[key].type) > -1;
        };
        var keys = Object.keys(struct);
        var isCollection = function isCollection(key) {
          return struct[key].type.indexOf('Collection') > -1 || isObject(key);
        };
        keys = keys.filter(isCollection);
        if (keys.length > 0) {
          return {
            v: _react2["default"].createElement(
              _Accordion2["default"],
              null,
              keys.map(function (key, i) {
                var data = _this4.state.struct[key];
                var len = '-1';
                if (data) {
                  len = isObject(key) ? Object.keys(data).length : data.length;
                }
                return _react2["default"].createElement(
                  _Panel2["default"],
                  {
                    key: i,
                    header: struct[key].label + ' (' + len + ')'
                  },
                  _react2["default"].createElement(
                    _Accordion2["default"],
                    {
                      orderable: (0, _lodash.has)(struct[key], 'orderable') ? struct[key].orderable : true,
                      reorder: _this4.updateCollectionOrder.bind(_this4, key)
                    },
                    _this4.renderCollection(struct[key], key)
                  ),
                  struct[key].type !== 'Object' && _react2["default"].createElement(
                    'button',
                    { onClick: _this4.addToCollection.bind(_this4, key) },
                    'Add a ',
                    (0, _pluralize2["default"])(struct[key].label, 1)
                  )
                );
              })
            )
          };
        }
      }();

      if (typeof _ret4 === "object") return _ret4.v;
    }
  };

  Struct.prototype.render = function render() {
    var struct = this.props.struct;

    var header = 'No header attr update struct.';
    if ((0, _lodash.has)(struct, 'header')) {
      if ((0, _lodash.isString)(struct.header) && (0, _lodash.has)(this.state.struct, struct.header)) {
        header = this.state.struct[struct.header];
      } else if ((0, _lodash.isFunction)(struct.header)) {
        header = struct.header(this.state.struct, parseInt(this.props.index, 10));
      }
    }
    if ((0, _lodash.isUndefined)(struct.label)) {
      (0, _warning2["default"])('undefined label?', struct);
    }
    if (struct.type === 'Object') {
      return _react2["default"].createElement(
        'div',
        null,
        this.renderNonCollections(struct || {}),
        this.renderCollections(struct || {}),
        _react2["default"].createElement('br', null),
        _react2["default"].createElement(
          'button',
          { onClick: this.updateState },
          'Update ',
          (0, _pluralize2["default"])(struct.label, 1)
        )
      );
    }
    return _react2["default"].createElement(
      _Panel2["default"],
      _extends({ header: header }, this.props),
      this.renderNonCollections(struct || {}),
      this.renderCollections(struct || {}),
      _react2["default"].createElement('br', null),
      _react2["default"].createElement(
        'button',
        { onClick: this.updateState },
        'Update ',
        (0, _pluralize2["default"])(struct.label, 1)
      ),
      _react2["default"].createElement(
        'button',
        { onClick: this.handleRemoveClick },
        'Remove ',
        (0, _pluralize2["default"])(struct.label, 1)
      )
    );
  };

  return Struct;
}(_react.Component);

Struct.propTypes = {
  data: _react.PropTypes.any,
  attr: _react.PropTypes.any,
  struct: _react.PropTypes.any,
  updateRef: _react.PropTypes.func,
  updateData: _react.PropTypes.func,
  optionTypes: _react.PropTypes.object,
  collectionTypes: _react.PropTypes.object,
  removeFromCollection: _react.PropTypes.func,

  index: _react.PropTypes.any,
  isOpen: _react.PropTypes.any,
  openPanel: _react.PropTypes.func
};

exports["default"] = Struct;