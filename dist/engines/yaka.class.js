'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Yaka = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tool = require('./../tool');

var _model = require('./model');

var _components = require('./../components/');

var _components2 = _interopRequireDefault(_components);

var _layoutComponents = require('./../layoutComponents/');

var _layoutComponents2 = _interopRequireDefault(_layoutComponents);

var _igrootFetch = require('igroot-fetch');

var _igrootFetch2 = _interopRequireDefault(_igrootFetch);

var _extend = require('./../extend/');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Yaka = exports.Yaka = function (_Component) {
    _inherits(Yaka, _Component);

    function Yaka(props) {
        _classCallCheck(this, Yaka);

        var _this = _possibleConstructorReturn(this, (Yaka.__proto__ || Object.getPrototypeOf(Yaka)).call(this));

        _initialiseProps.call(_this);

        var config = props.config,
            components = props.components,
            layoutComponents = props.layoutComponents,
            form = props.form;

        _this.functions = {};
        _this.rules = {};
        _this.config = config;
        _this.layouts = config.layout;
        _this.dataMap = config.dataMap || {};
        _this.components = components ? components : _components2.default;
        _this.layoutComponents = layoutComponents ? layoutComponents : _layoutComponents2.default;
        _this.form = form;
        _this.initData = config.initData || {};
        _this.state = config.global || {};
        _this.extend = _extend2.default;
        // logic state
        _this.logicState = {};
        _this.yakaApis = {
            formValueSettingFunction: function formValueSettingFunction(val) {
                return _this.form.setFieldsValue(val);
            },
            stateValueSettingFunction: function stateValueSettingFunction(val) {
                return _this.setState(val);
            },
            formValueGettingFunction: function formValueGettingFunction(key) {
                return _this.form.getFieldValue(key);
            },
            getState: function getState() {
                return _this.state;
            },
            getFunction: function getFunction() {
                return _this.functions;
            },
            getForm: function getForm() {
                return _this.form;
            },
            getComponent: function getComponent() {
                return { components: _this.components, layoutComponents: _this.layoutComponents, extend: _this.extend };
            },
            getInitData: function getInitData() {
                return _this.initData;
            }
        };
        return _this;
    }

    _createClass(Yaka, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                (0, _model.layout)(this.layouts, this.yakaApis)
            );
        }

        // 函数遍历


        // 数据模型绑定和运行


        // 表单规则遍历


        //状态遍历

    }, {
        key: 'getLogicMapComponent',
        value: function getLogicMapComponent(ele, state) {
            var initData = this.initData;
            if (ele.component === 'Logic' && ele.props && ele.props.value) {
                var key = ele.props.value;

                if (key.indexOf('$') > -1) {
                    var formKey = key.slice(1, key.length).split('.');
                    var value = initData[formKey[0]] || '';
                    this.logicState[formKey[0]] = {};
                    this.logicState[formKey[0]][formKey[1]] = value;
                }
            }
        }
    }]);

    return Yaka;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.componentWillMount = function () {
        //函数遍历
        _this2.functionsWalk();
        //函数绑定

        //state遍历
        _this2.stateWalk(_this2.layouts);

        // logicSetState
        _this2.setState(_this2.logicState);

        //数据映射遍历
        //规则遍历
        _this2.rulesWalk(_this2.layouts);
        //model遍历
        _this2.modelWalk();
        _this2.dataMapWalk();
    };

    this.componentDidMount = function () {
        //载入初始表单数据
        _this2.initForm();
    };

    this.componentWillReceiveProps = function (nextProps) {
        var debug = _this2.props.debug;

        if (debug && (nextProps.config.length !== _this2.props.config.length || JSON.stringify(nextProps.config) !== JSON.stringify(_this2.props.config))) {
            var config = nextProps.config;

            _this2.functions = {};
            _this2.rules = {};
            _this2.config = config;
            _this2.layouts = config.layout;
            _this2.initData = config.initData || {};
            Object.assign(_this2.state, config.global);
            //函数遍历
            _this2.functionsWalk();
            //函数绑定
            //state遍历
            _this2.stateWalk(_this2.layouts);
            //载入初始表单数据
            _this2.initForm();
            _this2.dataMapWalk();
        }
    };

    this.initForm = function () {
        _this2.form.setFieldsValue(_this2.initData);
    };

    this.functionsWalk = function () {
        Object.assign(_this2.functions, (0, _model.functions)(_this2.config.functions, _this2.yakaApis));
    };

    this.modelWalk = function () {
        Object.assign(_this2.functions, (0, _model.models)(_this2.config.models, _this2.yakaApis));
    };

    this.rulesWalk = function (layouts) {
        Object.assign(_this2.rules, (0, _model.rules)(layouts));
        _this2.props.getFormData && _this2.props.getFormData(_this2.rules);
    };

    this.dataMapWalk = function () {
        Object.assign(_this2.state, (0, _model.dataMap)(_this2.dataMap, _this2.yakaApis));
    };

    this.stateWalk = function (layouts) {
        if (!Array.isArray(layouts)) {
            throw Error('children must be an array!');
        }
        var state = {};
        layouts.forEach(function (ele) {
            if (ele.state) {
                var _state = {};
                var component_state = {};
                Object.keys(ele.state).forEach(function (key) {
                    component_state[key] = ele.state[key];
                });
                _state[ele.name] = component_state;
                Object.assign(state, _state);
            }

            if (ele.children) {
                Object.assign(state, _this2.stateWalk(ele.children));
            }

            _this2.getLogicMapComponent(ele);
        });

        _this2.setState(state);
    };
};