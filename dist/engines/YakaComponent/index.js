'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

require('igroot/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _yaka = require('./../yaka.class');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _form2.default.create()(_yaka.Yaka);