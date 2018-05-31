'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

exports.default = function (ele, _ref) {
    var elementWalk = _ref.elementWalk,
        componentCheck = _ref.componentCheck,
        initData = _ref.initData,
        components = _ref.components,
        form = _ref.form,
        bindingProps = _ref.bindingProps,
        yakaApis = _ref.yakaApis;
    var name = ele.name,
        value = ele.value,
        rules = ele.rules;
    var Editor = components.Editor;

    var FormItem = _form2.default.Item;
    var getFieldDecorator = form.getFieldDecorator;

    var props = bindingProps(ele, yakaApis);
    return _react2.default.createElement(
        FormItem,
        { key: name },
        getFieldDecorator('' + name, {
            initialValue: value ? value : null,
            rules: rules ? rules : null
        })(_react2.default.createElement(Editor, props))
    );
};

require('igroot/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }