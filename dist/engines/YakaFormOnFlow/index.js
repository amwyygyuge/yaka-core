'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YakaFormOnFlow = undefined;

var _rcForm = require('rc-form');

var _yaka = require('./../yaka.class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rulesWalk = function rulesWalk(layouts) {
    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!');
    }
    var rules = {};
    layouts.forEach(function (ele) {
        if (ele.rules) {
            rules[ele.name] = {
                component: ele.component,
                rules: ele.rules
            };
            return;
        }
        if (ele.component === 'Form') {
            ele.children.forEach(function (col) {
                rules[col.name] = {
                    component: col.component,
                    rules: col.rules
                };
            });
            return;
        }

        if (ele.component === 'EditTable') {
            var tableRules = {};
            ele.props.columns.forEach(function (col) {
                tableRules[col.name] = {
                    component: col.component,
                    rules: col.rules
                };
            });
            rules[ele.name] = tableRules;
            return;
        }
        if (ele.children) {
            Object.assign(rules, rulesWalk(ele.children));
        }
    });
    return rules;
};
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

            Object.assign(_this.rules, rules(layouts));
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

exports.default = (0, _rcForm.createForm)({
    onValuesChange: function onValuesChange(props, values) {
        if (IgrootConfigFormThis.props.edit === true) {
            var editNow = IgrootConfigFormThis.props.form.getFieldsValue();
            Object.assign(editNow, values);
            var _editNow = JSON.stringify(editNow);
            try {
                setStorageItem('editformNow', _editNow);
            } catch (error) {
                console.error(error);
            }
        }
    }
})(YakaFormOnFlow);