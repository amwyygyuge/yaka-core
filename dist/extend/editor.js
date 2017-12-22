'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, that) {
    var _that$components = that.components,
        Editor = _that$components.Editor,
        Form = _that$components.Form;

    var FormItem = Form.Item;
    var getFieldDecorator = that.form.getFieldDecorator;

    var props = that.bindingProps(ele);
    return _react2.default.createElement(
        FormItem,
        { key: ele.name },
        getFieldDecorator('' + ele.name, {
            initialValue: ele.value ? ele.value : null,
            rules: ele.rules ? ele.rules : null
        })(_react2.default.createElement(Editor, props))
    );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }