'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tool = require('./../../../tool/');

var _igrootFetch = require('igroot-fetch');

var _igrootFetch2 = _interopRequireDefault(_igrootFetch);

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yakaFetch = function yakaFetch(model, e, yakaApis) {
    var type = model.type,
        params = model.params,
        url = model.url,
        streams = model.streams,
        _model$headers = model.headers,
        headers = _model$headers === undefined ? {} : _model$headers,
        mountFunctions = model.mountFunctions;
    var getState = yakaApis.getState,
        getMountData = yakaApis.getMountData,
        formValueGettingFunction = yakaApis.formValueGettingFunction,
        getInitData = yakaApis.getInitData,
        getForm = yakaApis.getForm;
    // const { getFieldsValue } = getForm()
    // console.log(getFieldsValue());

    Object.keys(headers).forEach(function (key) {
        var val = headers[key] ? headers[key].toString() : '';
        if ((0, _tool.isReadState)(val)) {
            headers[key] = (0, _tool.readState)(val, getState());
        }
        if (val.indexOf('@') !== -1) {
            var name = val.slice(1, val.length);
            if (getMountData()[name]) {
                headers[key] = getMountData()[name];
            }
        }
    });
    return function () {
        var _params = {};
        if (params) {
            Object.keys(params).forEach(function (key) {
                var value = params[key] ? params[key].toString() : '';
                if ((0, _tool.isReadState)(value)) {
                    var val = (0, _tool.readState)(value, getState());
                    _params[key] = val;
                    return;
                }
                if (value.indexOf('#') !== -1) {
                    var _val = formValueGettingFunction(value.slice(1, value.length));
                    // if (auto) {
                    //     val = getInitData()[value.slice(1, value.length)]
                    // } else {
                    //     val = formValueGettingFunction(value.slice(1, value.length))
                    // }
                    if ((typeof _val === 'undefined' ? 'undefined' : _typeof(_val)) === 'object' && _val.key && _val.label) {
                        _val = _val.key;
                    }
                    _params[key] = _val;
                    return;
                }
                _params[key] = value;
            });
        }
        if (type === 'get' || type === 'restful') {
            (0, _igrootFetch2.default)(url, { headers: headers, handleHttpErrors: function handleHttpErrors() {} }).get(_params).then(function (res) {
                var code = res.code.toString();
                if (code && code !== '0') {
                    return;
                }
                streams && (0, _stream2.default)(streams, res, yakaApis)();
            });
        }
        if (type === 'post') {
            (0, _igrootFetch2.default)(url, { headers: headers, handleHttpErrors: function handleHttpErrors() {} }).post(_params).then(function (res) {
                var code = res.code.toString();
                if (code && code !== '0') {
                    return;
                }
                streams && (0, _stream2.default)(streams, res, yakaApis)();
            });
        }
    };
};
// const models = (models, e, yakaApis) => {
//     const _models = {}
//     Object.keys(models || {}).forEach(key => {
//         const model = models[key]
//         _models[key] = modelFactory(model, e, yakaApis)
//     })
//     return _models
// }
exports.default = yakaFetch;