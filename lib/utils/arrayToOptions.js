'use strict';

exports.__esModule = true;
exports["default"] = arrayToOptions;

var _lodash = require('lodash');

function arrayToOptions(array) {
  var useStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return array.map(function (i) {
    return { label: useStart ? (0, _lodash.startCase)(i) : i, value: i };
  });
}