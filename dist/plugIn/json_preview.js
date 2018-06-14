'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popover = require('igroot/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _icon = require('igroot/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('igroot/lib/input');

var _input2 = _interopRequireDefault(_input);

require('igroot/lib/popover/style');

require('igroot/lib/icon/style');

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
    delete _config.subs;
    var styles = {
        icon: {
            position: 'absolute',
            zIndex: 1029,
            right: -16,
            top: -16,
            fontSize: 16
        },
        overlayStyle: {
            minWidth: 300,
            height: 200
        }
    };
    var _Element = null;
    if (formCreatFunc) {
        _Element = formCreatFunc(Element);
    } else {
        _Element = Element;
    }
    var changeConfig = function changeConfig(newConfig, oldConfig) {
        Object.assign(oldConfig, newConfig);
        debug();
    };
    var Block = _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
            _popover2.default,
            { trigger: 'click',
                title: '\u6D4B\u8BD5',
                overlayStyle: styles.overlayStyle,
                content: _react2.default.createElement(
                    TextArea,
                    {
                        onPressEnter: function onPressEnter(e) {
                            e.preventDefault();
                            var config = JSON.parse(e.target.value);
                            changeConfig(config, config);
                        },
                        autosize: true
                    },
                    JSON.stringify(_config, null, 2)
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