'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var registerMountFunctions = function registerMountFunctions() {
    var mountFunctions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var yakaApis = arguments[1];

    var _mountFunctions = {};
    Object.keys(mountFunctions).forEach(function (key) {
        if (typeof mountFunctions[key] === 'function') {
            _mountFunctions[key] = function (e) {
                return mountFunctions[key](e, yakaApis);
            };
        } else {
            _mountFunctions[key] = function (e) {};
            console.error('mountFunctions ' + key + ' must be a function!');
        }
    });
    return _mountFunctions;
};
exports.default = registerMountFunctions;