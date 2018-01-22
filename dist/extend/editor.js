'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

exports.default = function (ele, that) {
    var Editor = that.components.Editor;

    var FormItem = _form2.default.Item;
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

require('igroot/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }