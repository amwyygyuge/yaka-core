'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 数据流入解析
var streamTo = function streamTo() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var obj = arguments[1];
    var target = arguments[2];

    if (arr.length === 0) return obj;
    var _obj = {};
    if (target !== undefined) {
        _obj[arr.pop()] = target;
    } else {
        _obj[arr.pop()] = obj;
    }
    return streamTo(arr, _obj);
};
// 数据流出解析
var streamForm = function streamForm() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var obj = arguments[1];
    var data = arguments[2];

    if (arr.length === 0) return obj;
    var _obj = {};
    var str = arr.shift();
    var keys = str.split('[');
    if (data !== undefined) {
        if (keys.length === 1) {
            _obj = data[keys[0]];
        } else {
            var num = parseInt(keys[1].replace(']', ''), 0);
            _obj = data[keys[0]][num];
        }
    } else {
        if (obj === undefined) {
            return null;
        } else {
            if (keys.length === 1) {
                _obj = obj[keys[0]];
            } else {
                var _num = parseInt(keys[1].replace(']', ''), 0);
                _obj = obj[keys[0]][_num];
            }
        }
    }
    return streamForm(arr, _obj);
};
// 读取state
var readState = function readState(key, state) {
    if (!key || !state) {
        return false;
    }
    var redirect = key.toString().slice(1, key.length).split('.');
    var data = streamForm(redirect, {}, state);
    if (typeof data === 'function') {
        return data();
    } else {
        return data;
    }
};
// 检查是否为读取state
var isReadState = function isReadState() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (!key) {
        return false;
    }
    return key.toString().indexOf('$') !== -1;
};

exports.readState = readState;
exports.isReadState = isReadState;
exports.streamTo = streamTo;
exports.streamForm = streamForm;