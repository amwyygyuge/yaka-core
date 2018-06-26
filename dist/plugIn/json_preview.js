'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popover = require('igroot/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _icon = require('igroot/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('igroot/lib/button');

var _button2 = _interopRequireDefault(_button);

var _input = require('igroot/lib/input');

var _input2 = _interopRequireDefault(_input);

require('igroot/lib/popover/style');

require('igroot/lib/icon/style');

require('igroot/lib/button/style');

require('igroot/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextArea = _input2.default.TextArea;
var json_preview = function json_preview(Element, _ref, _ref2) {
    var config = _ref.config,
        key = _ref.key;
    var debug = _ref2.debug,
        formCreatFunc = _ref2.formCreatFunc;

    var _config = JSON.parse(JSON.stringify(config));
    var value = '';
    delete _config.subs;
    var styles = {
        icon: {
            position: 'absolute',
            zIndex: 1029,
            right: 16,
            top: -16,
            fontSize: 16
        },
        overlayStyle: {
            minWidth: 300,
            height: 200
        },
        button: {
            marginTop: 8,
            float: 'right'
        },
        div: {
            overflow: 'hidden'
        }
    };
    var _Element = null;
    if (formCreatFunc) {
        _Element = formCreatFunc(Element);
    } else {
        _Element = Element;
    }
    var edit = function edit(e) {
        e.preventDefault();
        Object.assign(config, value);
        debug();
    };
    var Block = _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
            _popover2.default,
            {
                trigger: 'click',
                overlayStyle: styles.overlayStyle,
                content: _react2.default.createElement(
                    'div',
                    { style: styles.div },
                    _react2.default.createElement(TextArea, {
                        style: { width: '100%' },
                        onChange: function onChange(e) {
                            try {
                                JSON.parse(e.target.value);
                                value = JSON.parse(e.target.value);
                            } catch (e) {}
                        },
                        autosize: true,
                        defaultValue: JSON.stringify(_config, null, 2)
                    }),
                    _react2.default.createElement(
                        _button2.default,
                        { style: styles.button, type: 'primary', onClick: edit },
                        '\u4FEE\u6539'
                    )
                )
            },
            _react2.default.createElement(
                'a',
                null,
                _react2.default.createElement(_icon2.default, { type: 'tool', style: styles.icon })
            )
        ),
        _Element
    );
    return Block;
};
exports.default = json_preview;