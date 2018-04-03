'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YakaFormOnFlow = undefined;

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

require('igroot/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _yaka = require('./../yaka.class');

var _model = require('./../model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IgrootConfigFormThis = void 0;
function setStorageItem(key, value) {
    window.localStorage && window.localStorage.setItem(key, value);
}

var YakaFormOnFlow = exports.YakaFormOnFlow = function (_Yaka) {
    _inherits(YakaFormOnFlow, _Yaka);

    function YakaFormOnFlow(props) {
        _classCallCheck(this, YakaFormOnFlow);

        var _this = _possibleConstructorReturn(this, (YakaFormOnFlow.__proto__ || Object.getPrototypeOf(YakaFormOnFlow)).call(this, props));

        _this.rulesWalk = function () {
            var layouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            Object.assign(_this.rules, (0, _model.rules)(layouts));
            _this.props.getFormData && _this.props.getFormData(_this.rules);
        };

        _this.yakaWillMount = function () {
            var layouts = _this.layouts;

            _this.rulesWalk(layouts);
        };

        _this.yakaDidMount = function () {
            _this.setDidComponentConfig();
        };

        _this.submit = function (success, fail) {
            var validateFields = _this.form.validateFields;

            validateFields(function (err, val) {
                if (err) {
                    fail && fail(err);
                } else {
                    success && success(val);
                }
            });
        };

        _this.setDidComponentConfig = function () {
            var _this$props = _this.props,
                form = _this$props.form,
                onGetFormData = _this$props.onGetFormData,
                onGetForm = _this$props.onGetForm;
            var config = _this.props.config;


            onGetFormData && onGetFormData(_this.rules);
            onGetForm && onGetForm(_this, config);
        };

        IgrootConfigFormThis = _this;
        return _this;
    }

    // 表单规则遍历


    return YakaFormOnFlow;
}(_yaka.Yaka);

exports.default = _form2.default.create({
    onValuesChange: function onValuesChange(props, values) {
        if (IgrootConfigFormThis.props.edit === true) {
            var editNow = IgrootConfigFormThis.props.form.getFieldsValue();
            Object.assign(editNow, values);
            var _editNow = JSON.stringify(editNow);
            if (_editNow.length > 5 * 1024 * 1024) return;
            setStorageItem('editformNow', _editNow);
        }
    }
})(YakaFormOnFlow);