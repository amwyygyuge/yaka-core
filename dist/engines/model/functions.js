'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _mountFunctions = require('./mountFunctions');

var _mountFunctions2 = _interopRequireDefault(_mountFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functions = function functions(_functions2, yakaApis) {
    var _functions = {};
    Object.keys(_functions2 || {}).forEach(function (key) {
        _functions[key] = function (e) {
            _functions2[key].streams && (0, _stream2.default)(_functions2[key].streams, e, yakaApis);
            _functions2[key].mountFunctions && (0, _mountFunctions2.default)(_functions2[key].mountFunctions, e, yakaApis);
        };
    });
    return _functions;
};
exports.default = functions;