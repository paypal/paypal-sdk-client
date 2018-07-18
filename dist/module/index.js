'use strict';

exports.__esModule = true;

var _interface = require('./interface');

Object.defineProperty(exports, 'attach', {
  enumerable: true,
  get: function get() {
    return _interface.attach;
  }
});

var _constants = require('./constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});