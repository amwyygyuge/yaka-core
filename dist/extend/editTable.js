'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (item, _ref) {
    var yakaApis = _ref.yakaApis,
        elementWalk = _ref.elementWalk,
        componentCheck = _ref.componentCheck,
        initData = _ref.initData,
        components = _ref.components,
        form = _ref.form,
        bindingProps = _ref.bindingProps;
    var EditTable = components.EditTable;
    var name = item.name,
        props = item.props;
    var columns = props.columns,
        value = props.value,
        scrollWidth = props.scrollWidth,
        add = props.add,
        remove = props.remove,
        exportExcel = props.exportExcel;

    var _props = {
        columns: columns,
        value: initData[name] ? initData[name] : value ? value : null,
        ele: item,
        key: name,
        scrollWidth: scrollWidth,
        add: add,
        remove: remove,
        exportExcel: exportExcel,
        yakaApis: yakaApis, elementWalk: elementWalk, componentCheck: componentCheck, initData: initData, components: components, form: form, bindingProps: bindingProps
    };
    return _react2.default.createElement(EditTable, _props);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }