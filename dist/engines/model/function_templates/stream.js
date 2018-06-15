'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.streamFilter = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tool = require('./../../../tool');

// 数据分流
var streamFilter = function streamFilter(streamIn, data) {
    var value = null;
    switch (typeof streamIn === 'undefined' ? 'undefined' : _typeof(streamIn)) {
        //数据别名
        case 'object':
            if (streamIn.path) {
                value = (0, _tool.streamForm)(streamIn.path.toString().split('.'), {}, data);
                if (streamIn.alias) {
                    Object.keys(streamIn.alias).forEach(function (aliasKey) {
                        var alias = streamIn.alias[aliasKey];
                        Array.isArray(val) && val.map(function (item) {
                            item[aliasKey] = item[alias];
                            return item;
                        });
                    });
                }
                return value;
            } else {
                return streamIn;
            }
        //布尔类型
        case 'boolean':
            return streamIn;
        case 'string':
            if (streamIn === 'self') {
                return data;
            } else {
                value = streamIn.indexOf('.') !== -1 ? (0, _tool.streamForm)(streamIn.split('.'), {}, data) : streamIn;
                return value;
            }
        default:
            return value;
    }
};
// 数据流遍历
var streamWalk = function streamWalk() {
    var streams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var data = arguments[1];
    var yakaApis = arguments[2];

    return function () {
        var state = {};
        var formValueSettingFunction = yakaApis.formValueSettingFunction,
            stateValueSettingFunction = yakaApis.stateValueSettingFunction,
            formValueGettingFunction = yakaApis.formValueGettingFunction,
            getMountData = yakaApis.getMountData;

        Object.keys(streams).forEach(function (key) {
            key = key.toString();
            var value = streamFilter(streams[key], data);
            var key_arr = key.slice(1, key.length).split('.');
            //表单数据流        
            if (key.indexOf('#') !== -1) {
                if (key_arr.length === 1) {
                    var _stream = (0, _tool.streamTo)(key_arr, {}, value);
                    formValueSettingFunction(_stream);
                } else {
                    var formKey = key_arr;
                    var formValues = formValueGettingFunction(formKey[0]);
                    formValues[formKey[1]] = value;
                    var obj = {};
                    obj[formKey[0]] = formValues;
                    formValueSettingFunction(stream);
                }
            }
            //state数据流
            if ((0, _tool.isReadState)(key)) {
                var _stream2 = (0, _tool.streamTo)(key_arr, {}, value);
                Object.assign(state, _stream2);
            }
            // 外部接口接受
            if (key.indexOf('@') !== -1) {
                var props = getMountData();
                var name = key.slice(1, key.length);
                typeof props[name] === 'function' ? props[name](value) : console.error('props is not a funciton!');
            }
        });
        stateValueSettingFunction(state);
    };
};
exports.streamFilter = streamFilter;
exports.default = streamWalk;