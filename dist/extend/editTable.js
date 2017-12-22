'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, that) {
    var form = that.form,
        initData = that.initData;
    var EditTable = that.components.EditTable;
    var _ele$props = ele.props,
        columns = _ele$props.columns,
        value = _ele$props.value,
        scrollWidth = _ele$props.scrollWidth,
        add = _ele$props.add,
        remove = _ele$props.remove,
        exportExcel = _ele$props.exportExcel;

    var props = {
        that: that,
        columns: columns,
        value: initData[ele.name] ? initData[ele.name] : value ? value : null,
        ele: ele,
        form: form,
        key: ele.name,
        scrollWidth: scrollWidth,
        add: add,
        remove: remove,
        exportExcel: exportExcel
    };
    return _react2.default.createElement(EditTable, props);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }