'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YakaForm = undefined;

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

var _button = require('igroot/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/form/style');

require('igroot/lib/button/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('./../model');

var _yaka = require('./../yaka.class');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YakaForm = exports.YakaForm = function (_Yaka) {
    _inherits(YakaForm, _Yaka);

    function YakaForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, YakaForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YakaForm.__proto__ || Object.getPrototypeOf(YakaForm)).call.apply(_ref, [this].concat(args))), _this), _this.yakaDidMount = function () {
            _this.setDidComponentConfig();
        }, _this.onSubmit = function () {
            var validateFields = _this.form.validateFields;
            var onSubmit = _this.props.onSubmit;

            validateFields(function (err, val) {
                if (err) {
                    onSubmit && onSubmit(val);
                } else {
                    onSubmit && onSubmit(val);
                }
            });
        }, _this.setDidComponentConfig = function () {
            var onGetForm = _this.props.onGetForm;

            onGetForm && onGetForm(_this.form);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(YakaForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                (0, _model.layout)(this.layouts, this.yakaApis),
                this.props.onSubmit ? _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'center', margin: '15px 0' } },
                    _react2.default.createElement(
                        _button2.default,
                        { type: 'primary', onClick: this.onSubmit },
                        '\u63D0\u4EA4'
                    )
                ) : null
            );
        }
    }]);

    return YakaForm;
}(_yaka.Yaka);

exports.default = _form2.default.create()(YakaForm);