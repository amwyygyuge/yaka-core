'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, _ref, props) {
    var components = _ref.components,
        form = _ref.form;
    var name = ele.name,
        value = ele.value,
        rules = ele.rules;
    var Editor = components.Editor;
    var getFieldDecorator = form.getFieldDecorator;

    return getFieldDecorator('' + name, {
        initialValue: value ? value : null,
        rules: rules ? rules : null
    })(_react2.default.createElement(Editor, props));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }