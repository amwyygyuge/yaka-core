'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popover = require('igroot/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _button = require('igroot/lib/button');

var _button2 = _interopRequireDefault(_button);

var _tag = require('igroot/lib/tag');

var _tag2 = _interopRequireDefault(_tag);

require('igroot/lib/popover/style');

require('igroot/lib/button/style');

require('igroot/lib/tag/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quick_setup = function quick_setup(Element, _ref, _ref2) {
    var config = _ref.config,
        key = _ref.key,
        parent = _ref.parent;
    var debug = _ref2.debug,
        yakaApis = _ref2.yakaApis;

    var styles = {
        overlayStyle: {
            minWidth: 300,
            maxWidth: 500,
            height: 200
        },
        div: {
            textAlign: 'center'
        },
        tag: {
            marginTop: 8
        }
    };
    var getComponent = yakaApis.getComponent;

    var tgaClick = function tgaClick(val) {
        config.ele = val;
        // config.subs = [{}]
        debug();
    };

    var _getComponent = getComponent(),
        components = _getComponent.components,
        layoutComponents = _getComponent.layoutComponents;

    var componentNames = Object.keys(components);
    if (parent === 'formBlock') {
        componentNames = componentNames.filter(function (item) {
            return item === "Checkbox" || item === "Input" || item === "InputNumber" || item === "TextArea" || item === "Switch" || item === "TimePicker" || item === "Select" || item === "DatePicker" || item === "Radio";
        });
    }
    var eleTags = componentNames.map(function (com) {
        return _react2.default.createElement(
            _tag2.default,
            { key: com, style: styles.tag, onClick: function onClick() {
                    return tgaClick(com);
                }, color: '#2db7f5' },
            com
        );
    });
    var Block = _react2.default.createElement(
        'div',
        { key: key, style: styles.div },
        _react2.default.createElement(
            _popover2.default,
            { trigger: 'click',
                title: '\u6DFB\u52A0\u7EC4\u4EF6',
                overlayStyle: styles.overlayStyle,
                content: eleTags
            },
            _react2.default.createElement(
                _button2.default,
                { type: 'primary' },
                '\u6DFB\u52A0\u7EC4\u4EF6'
            )
        )
    );
    return Block;
};
exports.default = quick_setup;