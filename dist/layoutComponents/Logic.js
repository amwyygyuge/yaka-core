'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, _ref) {
    var yakaApis = _ref.yakaApis,
        bindingProps = _ref.bindingProps,
        componentCheck = _ref.componentCheck,
        elementWalk = _ref.elementWalk;

    var _bindingProps = bindingProps(ele, yakaApis),
        value = _bindingProps.value,
        components = _bindingProps.components;

    if (Array.isArray(components)) {
        return _react2.default.createElement(
            'div',
            null,
            components.map(function (component) {
                if (Array.isArray(value)) {
                    if (value.some(function (val) {
                        return val === component.value;
                    })) {
                        return elementWalk(Array.isArray(component.component) ? component.component : [component.component], yakaApis);
                    } else {
                        return null;
                    }
                } else {
                    if (value === component.value) {
                        return elementWalk(Array.isArray(component.component) ? component.component : [component.component], yakaApis);
                    } else {
                        return null;
                    }
                }
            })
        );
    } else {
        return _react2.default.createElement(
            'div',
            null,
            components.value === value ? elementWalk(Array.isArray(components.component) ? components.component : [components.component], yakaApis) : null
        );
    }
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }