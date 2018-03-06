'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tool = require('./../../tool/');

var functions = function functions(_functions2, yakaApis) {
    var _functions = {};
    Object.keys(_functions2 || {}).forEach(function (key) {
        _functions[key] = function (e) {
            (0, _tool.streamWalk)(_functions2[key].streams, e, yakaApis);
        };
    });
    return _functions;
};
exports.default = functions;