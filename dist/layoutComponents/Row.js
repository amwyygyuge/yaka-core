'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ele, that) {
    var _that$components = that.components,
        Col = _that$components.Col,
        Row = _that$components.Row;

    var props = that.bindingProps(ele);
    if ('style' in props) {
        Object.assign({ marginTop: 15 }, props.style);
    } else {
        props.style = { marginTop: 15 };
    }
    return _react2.default.createElement(
        Row,
        props,
        ele.children.map(function (col, index) {
            return _react2.default.createElement(
                Col,
                { span: col.col && col.col || 0, key: ele.name + '-' + index },
                that.elementWalk([col])
            );
        })
    );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }