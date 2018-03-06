'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var streamTo = function streamTo(arr, obj, target) {
    if (arr.length === 0) return obj;
    var _obj = {};
    if (target !== undefined) {
        _obj[arr.pop()] = target;
    } else {
        _obj[arr.pop()] = obj;
    }
    return streamTo(arr, _obj);
};
var streamForm = function streamForm(arr, obj, data) {
    if (arr.length === 0) return obj;
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
var readState = function readState(key, state) {
    var redirect = key.slice(1, key.length).split('.');
    var data = streamForm(redirect, {}, state);
    if (typeof data === 'function') {
        return data();
    } else {
        return data;
    }
};
var isReadState = function isReadState(key) {
    return key.indexOf('$') !== -1;
};
var streamFilter = function streamFilter(streamIn, data) {
    var val = null;
    switch (typeof streamIn === 'undefined' ? 'undefined' : _typeof(streamIn)) {
        //数据别名
        case 'object':
            val = streamForm(streamIn.path.split('.'), {}, data);
            Object.keys(streamIn.alias).forEach(function (aliasKey) {
                var alias = streamIn.alias[aliasKey];
                val.map(function (item) {
                    item[aliasKey] = item[alias];
                    return item;
                });
            });
            return val;
        //布尔类型
        case 'boolean':
            return streamIn;
        case 'string':
            val = streamIn.indexOf('.') !== -1 ? streamForm(streamIn.split('.'), {}, data) : data;
            return val;
        default:
            return val;
    }
};
var streamWalk = function streamWalk(streams, data, yakaApis) {
    var state = {};
    var formValueSettingFunction = yakaApis.formValueSettingFunction,
        stateValueSettingFunction = yakaApis.stateValueSettingFunction,
        formValueGettingFunction = yakaApis.formValueGettingFunction;

    Object.keys(streams).forEach(function (key) {
        var val = streamFilter(streams[key], data);
        if (key.indexOf('#') !== -1) {
            //表单数据流
            if (key.slice(1, key.length).split('.').length === 1) {
                var _stream = streamTo(key.slice(1, key.length).split('.'), {}, val);
                formValueSettingFunction(_stream);
            } else {
                var formKey = key.slice(1, key.length).split('.');
                var formValues = formValueGettingFunction(formKey[0]);
                formValues[formKey[1]] = val;
                var obj = {};
                obj[formKey[0]] = formValues;
                formValueSettingFunction(stream);
            }
        }
        //state数据流
        if (isReadState(key)) {
            var _stream2 = streamTo(key.slice(1, key.length).split('.'), {}, val);
            Object.assign(state, _stream2);
        }
    });
    stateValueSettingFunction(state);
};

exports.streamTo = streamTo;
exports.streamForm = streamForm;
exports.readState = readState;
exports.isReadState = isReadState;
exports.streamWalk = streamWalk;
exports.streamFilter = streamFilter;