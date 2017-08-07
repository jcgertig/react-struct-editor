'use strict';

exports.__esModule = true;

var _BasicType = require('./BasicType');

var _BasicType2 = _interopRequireDefault(_BasicType);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Array = require('./Array');

var _Array2 = _interopRequireDefault(_Array);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Object = require('./Object');

var _Object2 = _interopRequireDefault(_Object);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Boolean = require('./Boolean');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _KeyValue = require('./KeyValue');

var _KeyValue2 = _interopRequireDefault(_KeyValue);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  basic: _BasicType2["default"],
  text: _Text2["default"],
  array: _Array2["default"],
  option: _Option2["default"],
  object: _Object2["default"],
  number: _Number2["default"],
  "boolean": _Boolean2["default"],
  keyValue: _KeyValue2["default"],
  collection: _Collection2["default"]
};