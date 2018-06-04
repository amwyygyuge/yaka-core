'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mountFunctions = require('./mountFunctions');

var _mountFunctions2 = _interopRequireDefault(_mountFunctions);

var _function_templates = require('./function_templates');

var _function_templates2 = _interopRequireDefault(_function_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registerFunctions = function registerFunctions() {
    var functions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var functionTemplates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var yakaApis = arguments[2];

    var _functions = {};
    Object.assign(_function_templates2.default, functionTemplates);
    Object.keys(functions).forEach(function (key) {
        var _functions$key = functions[key],
            type = _functions$key.type,
            definition = _functions$key.definition;

        var template = _function_templates2.default[type];
        if (template) {
            _functions[key] = function (e) {
                template(definition, e, yakaApis)();
            };
        } else {
            _functions[key] = function (e) {};

            console.error('Function ' + key + ' templates are not defined!');
        }
    });
    return _functions;
};
exports.default = registerFunctions;