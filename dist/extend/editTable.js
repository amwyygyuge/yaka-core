'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, _ref) {
    var yakaApis = _ref.yakaApis,
        elementWalk = _ref.elementWalk,
        componentCheck = _ref.componentCheck,
        initData = _ref.initData,
        components = _ref.components,
        form = _ref.form,
        bindingProps = _ref.bindingProps;
    var EditTable = components.EditTable;
    var _ele$props = ele.props,
        columns = _ele$props.columns,
        value = _ele$props.value,
        scrollWidth = _ele$props.scrollWidth,
        add = _ele$props.add,
        remove = _ele$props.remove,
        exportExcel = _ele$props.exportExcel;

    var props = {
        columns: columns,
        value: initData[ele.name] ? initData[ele.name] : value ? value : null,
        ele: ele,
        key: ele.name,
        scrollWidth: scrollWidth,
        add: add,
        remove: remove,
        exportExcel: exportExcel,
        yakaApis: yakaApis, elementWalk: elementWalk, componentCheck: componentCheck, initData: initData, components: components, form: form, bindingProps: bindingProps
    };
    return _react2.default.createElement(EditTable, props);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }