'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tool = require('./../../tool/');

var _igrootFetch = require('igroot-fetch');

var _igrootFetch2 = _interopRequireDefault(_igrootFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modelFactory = function modelFactory(model, yakaApis) {
    var getState = yakaApis.getState;

    return function () {
        var auto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var params = {};
        if (auto !== true && model.params) {
            Object.keys(model.params).forEach(function (key) {
                var value = model.params[key];
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
        (0, _igrootFetch2.default)(model.url).get(params).then(function (res) {
            (0, _tool.streamWalk)(model.streams, res, yakaApis);
        });
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