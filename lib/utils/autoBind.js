'use strict';

exports.__esModule = true;
exports["default"] = autoBind;

var _lodash = require('lodash');

function autoBind(scope) {
  var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  for (var _iterator = names, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var name = _ref;

    if ((0, _lodash.has)(scope, name)) {
      scope[name] = scope[name].bind(scope);
    }
  }
}