'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _defaultFromStruct = require('../utils/defaultFromStruct');

var _defaultFromStruct2 = _interopRequireDefault(_defaultFromStruct);

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _Accordion = require('./Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _Struct = require('./Struct');

var _Struct2 = _interopRequireDefault(_Struct);

var _ObjectEditor = require('./ObjectEditor');

var _ObjectEditor2 = _interopRequireDefault(_ObjectEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StructEditor = function (_Component) {
  _inherits(StructEditor, _Component);

  function StructEditor() {
    _classCallCheck(this, StructEditor);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    (0, _autoBind2["default"])(_this, ['removeFromCollection', 'updateCollection', 'updateCollectionOrder', 'addStruct', 'directUpdate', 'updateStateKey']);
    return _this;
  }

  StructEditor.prototype.removeFromCollection = function removeFromCollection(key, index) {
    var data = (0, _lodash.cloneDeep)(this.props.data);
    var collection = data[key];
    (0, _lodash.pullAt)(collection, [index]);
    data[key] = collection;
    this.props.setData(data);
  };

  StructEditor.prototype.updateCollection = function updateCollection(key, val, index) {
    var needsUpdate = false;
    var data = (0, _lodash.cloneDeep)(this.props.data);
    var collection = data[key];
    var current = collection[index];

    var struct = this.props.struct;

    var idAttr = (0, _lodash.findKey)(struct[key].struct, { type: 'Id' });
    if (!(0, _lodash.isUndefined)(idAttr) && current[idAttr] !== val[idAttr]) {
      var _find;

      if (!(0, _lodash.isUndefined)((0, _lodash.find)(data, (_find = {}, _find[idAttr] = val[idAttr], _find)))) {
        alert('Id types must be unique to collection. (' + idAttr + ')'); // eslint-disable-line
        return;
      }
      needsUpdate = true;
    }

    collection[index] = val;
    data[key] = collection;
    this.props.setData(data);
    if (needsUpdate) {
      this.props.updateRef({ currentId: current[idAttr], newId: val[idAttr] });
    }
  };

  StructEditor.prototype.updateCollectionOrder = function updateCollectionOrder(key, newOrder) {
    var data = (0, _lodash.cloneDeep)(this.props.data);
    var collection = data[key];

    var orderedSet = [];
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

      orderedSet.push(collection[parseInt(order, 10)]);
    }
    data[key] = orderedSet;

    this.props.setData(data);
  };

  StructEditor.prototype.addStruct = function addStruct(key) {
    var struct = this.props.struct;

    var data = (0, _lodash.cloneDeep)(this.props.data);
    var collection = data[key];
    var s = struct;
    if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type') && (s[key].type === 'KeyValue' || s[key].type === 'Object')) {
      collection[''] = undefined;
    } else if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type') && s[key].type === 'Array') {
      data.push(s[key].struct["default"]);
    } else if ((0, _lodash.has)(s, key) && (0, _lodash.has)(s[key], 'type')) {
      data.push((0, _defaultFromStruct2["default"])(s[key].struct));
    } else {
      collection.push((0, _defaultFromStruct2["default"])(s[key].struct));
    }
    data[key] = collection;
    this.props.setData(data);
  };

  StructEditor.prototype.directUpdate = function directUpdate(val) {
    this.props.setData(val);
  };

  StructEditor.prototype.updateStateKey = function updateStateKey(key, val) {
    var _Object$assign;

    this.props.setData(Object.assign({}, this.props.data, (_Object$assign = {}, _Object$assign[key] = val, _Object$assign)));
  };

  StructEditor.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        struct = _props.struct,
        data = _props.data,
        collectionTypes = _props.collectionTypes,
        updateRef = _props.updateRef,
        optionTypes = _props.optionTypes;

    var keys = Object.keys(struct);
    if (keys.length > 1) {
      return _react2["default"].createElement(_Struct2["default"], {
        index: 0,
        attr: '',
        data: data,
        struct: struct,
        updateRef: updateRef,
        optionTypes: optionTypes,
        updateData: this.directUpdate,
        removeFromCollection: function removeFromCollection() {},
        collectionTypes: collectionTypes
      });
    } else if (keys.length === 1) {
      var _ret = function () {
        var key = keys[0];
        if (struct[key].type === 'Collection') {
          return {
            v: _react2["default"].createElement(
              'div',
              null,
              _react2["default"].createElement(
                _Accordion2["default"],
                {
                  orderable: (0, _lodash.has)(struct[key], 'orderable') ? struct[key].orderable : true,
                  reorder: _this2.updateCollectionOrder.bind(_this2, key)
                },
                data[key].map(function (d, i) {
                  return _react2["default"].createElement(_Struct2["default"], {
                    key: i,
                    data: d,
                    attr: key,
                    struct: struct[key],
                    updateRef: updateRef,
                    optionTypes: optionTypes,
                    collectionTypes: collectionTypes,
                    removeFromCollection: _this2.removeFromCollection,
                    updateData: _this2.updateCollection.bind(_this2, key)
                  });
                })
              ),
              _react2["default"].createElement(
                'button',
                { onClick: _this2.addStruct.bind(_this2, key) },
                'Add ',
                (0, _pluralize2["default"])(struct[key].label, 1)
              )
            )
          };
        } else if (struct[key].type.indexOf('Collection') > -1) {
          var _ret2 = function () {
            var Comp = collectionTypes[struct[key].type.replace('Collection', '')];
            if (!(0, _lodash.isUndefined)(Comp)) {
              return {
                v: {
                  v: _react2["default"].createElement(
                    'div',
                    null,
                    _react2["default"].createElement(
                      _Accordion2["default"],
                      {
                        orderable: (0, _lodash.has)(struct[key], 'orderable') ? struct[key].orderable : true,
                        reorder: _this2.updateCollectionOrder.bind(_this2, key)
                      },
                      data[key].map(function (d, i) {
                        return _react2["default"].createElement(Comp, {
                          key: i,
                          data: d,
                          attr: key,
                          struct: struct[key],
                          optionTypes: optionTypes,
                          collectionTypes: collectionTypes,
                          removeFromCollection: _this2.removeFromCollection,
                          updateData: _this2.updateCollection.bind(_this2, key)
                        });
                      })
                    ),
                    _react2["default"].createElement(
                      'button',
                      { onClick: _this2.addStruct.bind(_this2, key) },
                      'Add ',
                      (0, _pluralize2["default"])(struct[key].label, 1)
                    )
                  )
                }
              };
            }
          }();

          if (typeof _ret2 === "object") return _ret2.v;
        } else if (struct[key].type === 'KeyValue' || struct[key].type === 'Object') {
          return {
            v: _react2["default"].createElement(_ObjectEditor2["default"], {
              name: key,
              value: data[key],
              struct: struct[key],
              optionTypes: optionTypes,
              onChange: _this2.updateStateKey,
              collectionTypes: collectionTypes,
              updateCollectionOrder: _this2.updateCollectionOrder
            })
          };
        }
      }();

      if (typeof _ret === "object") return _ret.v;
    }
    return _react2["default"].createElement(
      'div',
      null,
      'Alert! No content in struct!'
    );
  };

  return StructEditor;
}(_react.Component);

StructEditor.propTypes = {
  updateRef: _react.PropTypes.func,
  optionTypes: _react.PropTypes.object,
  collectionTypes: _react.PropTypes.object,
  data: _react.PropTypes.object.isRequired,
  setData: _react.PropTypes.func.isRequired,
  struct: _react.PropTypes.object.isRequired
};

StructEditor.defaultProps = {
  collectionTypes: [],
  optionTypes: {},
  updateRef: function updateRef() {}
};

exports["default"] = StructEditor;