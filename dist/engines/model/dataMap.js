'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tool = require('./../../tool/');

var dataMap = function dataMap(_dataMap2, yakaApis) {
    var _dataMap = {};
    var getState = yakaApis.getState;

    Object.keys(_dataMap2 || {}).forEach(function (key) {
        _dataMap[key] = function () {
            var state = getState();
            var _dataMap$key = _dataMap2[key],
                value = _dataMap$key.value,
                map = _dataMap$key.map;

            value = (0, _tool.readState)(value, state);
            var m = map.find(function (m) {
                return m.value === value;
            });
            if (m) {
                var _key = m.data;
                if ((0, _tool.isReadState)(_key)) {
                    return (0, _tool.readState)(_key, state);
                } else {
                    return _key;
                }
            } else {
                return null;
            }
        };
    });
    return _dataMap;
};
exports.default = dataMap;