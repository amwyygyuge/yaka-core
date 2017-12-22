'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, that) {
    var _that$bindingProps = that.bindingProps(ele),
        value = _that$bindingProps.value,
        components = _that$bindingProps.components;

    console.log(value, 'value', that.form.getFieldValue());
    if (Array.isArray(components)) {
        return _react2.default.createElement(
            'div',
            null,
            components.map(function (component) {
                if (Array.isArray(value)) {
                    if (value.some(function (val) {
                        return val === component.value;
                    })) {
                        return that.elementWalk(Array.isArray(component.component) ? component.component : [component.component]);
                    } else {
                        return null;
                    }
                } else {
                    if (value === component.value) {
                        return that.elementWalk(Array.isArray(component.component) ? component.component : [component.component]);
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
            components.value === value ? that.elementWalk(Array.isArray(components.component) ? components.component : [components.component]) : null
        );
    }
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }