'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 数据流入解析
var streamTo = function streamTo(arr, obj, target) {
    if (Array.isArray(arr) && arr.length === 0) return obj;
    var _obj = {};
    if (target !== undefined) {
        _obj[arr.pop()] = target;
    } else {
        _obj[arr.pop()] = obj;
    }
    return streamTo(arr, _obj);
};
// 数据流出解析
var streamForm = function streamForm(arr, obj, data) {
    if (Array.isArray(arr) && arr.length === 0) return obj;
    var _obj = {};
    if (data !== undefined) {
        _obj = data[arr.shift()];
    } else {
        if (obj === undefined) {
            return null;
        } else {
            _obj = obj[arr.shift()];
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