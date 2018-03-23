'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tool = require('./../../tool/');

var _igrootFetch = require('igroot-fetch');

var _igrootFetch2 = _interopRequireDefault(_igrootFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const BsFetch1 = BsFetch()
var modelFactory = function modelFactory(model, yakaApis) {
    var type = model.type,
        params = model.params,
        url = model.url,
        streams = model.streams,
        _model$headers = model.headers,
        headers = _model$headers === undefined ? {} : _model$headers;
    var getState = yakaApis.getState,
        getProps = yakaApis.getProps;

    Object.keys(headers).forEach(function (key) {
        var val = headers[key];
        if ((0, _tool.isReadState)(val)) {
            headers[key] = (0, _tool.readState)(val, getState());
        }
        if (val.indexOf('@') !== -1) {
            var name = val.slice(1, val.length);
            if (getProps()[name]) {
                headers[key] = getProps()[name];
            }
        }
    });
    return function () {
        var auto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var params = {};
        if (auto !== true && params) {
            Object.keys(params).forEach(function (key) {
                var value = params[key];
                if ((0, _tool.isReadState)(value)) {
                    var val = (0, _tool.readState)(value, getState());
                    params[key] = val;
                    return;
                }
                if (value.indexOf('#') !== -1) {
                    var _val = formValueGettingFunction(value.slice(1, value.length));
                    params[key] = _val;
                    return;
                }
                params[key] = value;
            });
        }
        if (type === 'get' || type === 'restful') {
            (0, _igrootFetch2.default)(url, { headers: headers }).get(params).then(function (res) {
                (0, _tool.streamWalk)(streams, res, yakaApis);
            });
        }
        if (type === 'post') {
            (0, _igrootFetch2.default)(url, { headers: headers }).post(params).then(function (res) {
                (0, _tool.streamWalk)(streams, res, yakaApis);
            });
        }
    };
};
var models = function models(_models2, yakaApis) {
    var _models = {};
    Object.keys(_models2 || {}).forEach(function (key) {
        var model = _models2[key];
        _models[key] = modelFactory(model, yakaApis);
        if (model.action === 'auto') {
            _models[key](true);
        }
    });
    return _models;
};
exports.default = models;