'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YakaSelect = undefined;

var _select = require('igroot/lib/select');

var _select2 = _interopRequireDefault(_select);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/select/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;

var YakaSelect = exports.YakaSelect = function (_Component) {
    _inherits(YakaSelect, _Component);

    function YakaSelect() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, YakaSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YakaSelect.__proto__ || Object.getPrototypeOf(YakaSelect)).call.apply(_ref, [this].concat(args))), _this), _this.handleFilterOption = function (input, option) {
            var _this$props = _this.props,
                searchKeys = _this$props.searchKeys,
                options = _this$props.options;

            var inputText = input.toLowerCase();
            var optionValue = option.props.value.toLowerCase();
            var optionChildren = option.props.children.toLowerCase();
            var isMatch = optionValue.indexOf(inputText) >= 0 || optionChildren.indexOf(inputText) >= 0;

            if (searchKeys.length) {
                var optionItem = options.filter(function (item) {
                    return item.value.toLowerCase() === optionValue;
                })[0];

                searchKeys.map(function (key) {
                    isMatch = isMatch || optionItem[key] && optionItem[key].toLowerCase().indexOf(inputText) >= 0;
                });
            }

            return isMatch;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(YakaSelect, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var children = [];

            if ('options' in props) {
                if (Array.isArray(props.options)) {
                    props.options.forEach(function (option) {
                        children.push(_react2.default.createElement(
                            Option,
                            { key: '' + option.value, value: '' + option.value },
                            option.label
                        ));
                    });
                }
            }

            return _react2.default.createElement(
                _select2.default,
                _extends({
                    showSearch: true,
                    allowClear: true,
                    filterOption: this.handleFilterOption
                }, props, {
                    style: { width: '100%' }
                }),
                children
            );
        }
    }]);

    return YakaSelect;
}(_react.Component);