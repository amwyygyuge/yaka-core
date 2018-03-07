'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _row = require('igroot/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('igroot/lib/col');

var _col2 = _interopRequireDefault(_col);

exports.default = function (ele, _ref) {
    var yakaApis = _ref.yakaApis,
        form = _ref.form,
        bindingProps = _ref.bindingProps,
        componentCheck = _ref.componentCheck,
        elementWalk = _ref.elementWalk;

    var props = bindingProps(ele, yakaApis);
    if ('style' in props) {
        Object.assign({ marginTop: 15 }, props.style);
    } else {
        props.style = { marginTop: 15 };
    }
    return _react2.default.createElement(
        _row2.default,
        props,
        ele.children.map(function (col, index) {
            return _react2.default.createElement(
                _col2.default,
                { span: col.col && col.col || 0, key: ele.name + '-' + index },
                elementWalk([col], yakaApis)
            );
        })
    );
};

require('igroot/lib/row/style');

require('igroot/lib/col/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }