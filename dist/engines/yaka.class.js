'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Yaka = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('./model');

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

        // yaka props解构
        var _this = _possibleConstructorReturn(this, (Yaka.__proto__ || Object.getPrototypeOf(Yaka)).call(this));

        _initialiseProps.call(_this);

        var config = props.config,
            _props$components = props.components,
            components = _props$components === undefined ? {} : _props$components,
            _props$layoutComponen = props.layoutComponents,
            layoutComponents = _props$layoutComponen === undefined ? {} : _props$layoutComponen,
            form = props.form,
            _props$mountFunctions = props.mountFunctions,
            mountFunctions = _props$mountFunctions === undefined ? {} : _props$mountFunctions,
            _props$functionTempla = props.functionTemplates,
            functionTemplates = _props$functionTempla === undefined ? {} : _props$functionTempla;
        // config 对象解构

        var _config$init = config.init,
            init = _config$init === undefined ? {} : _config$init,
            _config$layout = config.layout,
            layout = _config$layout === undefined ? [] : _config$layout,
            _config$mounted = config.mounted,
            mounted = _config$mounted === undefined ? {} : _config$mounted,
            _config$eleGroup = config.eleGroup,
            eleGroup = _config$eleGroup === undefined ? {} : _config$eleGroup;
        // init 对象解构

        var _init$functions = init.functions,
            functions = _init$functions === undefined ? {} : _init$functions,
            _init$state = init.state,
            state = _init$state === undefined ? {} : _init$state,
            _init$watch = init.watch,
            watch = _init$watch === undefined ? {} : _init$watch,
            _init$event = init.event,
            event = _init$event === undefined ? {} : _init$event,
            _init$formValue = init.formValue,
            formValue = _init$formValue === undefined ? {} : _init$formValue;
        // 表单实力

        _this.form = form;
        // 表单规则
        _this.rules = {};
        // 配置
        _this.config = config;
        // 代码片段
        _this.eleGroup = eleGroup;
        // 挂载声明周期钩子
        _this.mounted = mounted;
        // 布局
        _this.layout = layout;
        // 组件对象
        _this.components = components;
        _this.layoutComponents = layoutComponents;
        // 表单对象
        _this.form = form;
        // 表单初始值
        _this.formValue = formValue;
        // state 初始化全局变量
        _this.state = state;
        _this.props = props;
        // 特殊处理
        _this.extend = _extend2.default;
        // TODO   数据监听
        _this.watch = {};
        // TODO 事件代理
        _this.event = {};
        _this.logicState = {};
        // 引擎api
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
                return _this.mountFunctions;
            },
            getForm: function getForm() {
                return _this.form;
            },
            getComponent: function getComponent() {
                return { components: _this.components, layoutComponents: _this.layoutComponents, extend: _this.extend };
            },
            getInitData: function getInitData() {
                return _this.formValue;
            },
            getProps: function getProps() {
                return _this.props;
            }
            // 挂载函数
        };_this.mountFunctions = _this.functionsWalk(functions, functionTemplates, mountFunctions, _this.yakaApis);
        return _this;
    }

    _createClass(Yaka, [{
        key: 'render',
        value: function render() {
            return (0, _model.layout)(this.layout, this.yakaApis);
        }

        // 数据载入


        // 函数遍历


        // 数据模型绑定和运行


        // 数据map遍历


        // 状态遍历

    }]);

    return Yaka;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.componentWillMount = function () {
        _this2.yakaInit();
    };

    this.componentDidMount = function () {
        var mountFunctions = _this2.mountFunctions,
            formValue = _this2.formValue,
            mounted = _this2.mounted;
        // 初始化表单数据

        _this2.initForm(formValue);
        setTimeout(function () {
            _this2.initForm(formValue);
        }, 0);
        // 运行挂载之后的函数
        _this2.yakaMounted(mounted, mountFunctions);
        _this2.yakaDidMount();
    };

    this.yakaDidMount = function () {};

    this.yakaInit = function () {
        _this2.yakaWillMount();
    };

    this.yakaMounted = function () {
        var mounted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var mountFunctions = arguments[1];
        var _mounted$run = mounted.run,
            run = _mounted$run === undefined ? {} : _mounted$run;

        Object.keys(run).forEach(function (key) {
            var _funtion = mountFunctions[key];
            if (_funtion) {
                _funtion();
            } else {
                console.error('mounted run ' + key + ' is not a defined!');
            }
        });
    };

    this.yakaWillMount = function () {};

    this.reset = function (nextProps) {
        var config = nextProps.config;
        var models = config.models,
            functions = config.functions,
            layouts = config.layouts,
            initData = config.initData;

        _this2.config = config;
        _this2.layouts = config.layout;
        _this2.initData = config.initData || {};
        Object.assign(_this2.state, config.global);
        //函数遍历
        _this2.functionsWalk(functions);
        //state遍历
        _this2.stateWalk(layouts, initData);
        //载入初始表单数据
        _this2.dataMapWalk(_this2.state);
        setTimeout(function () {
            _this2.initForm(initData);
        }, 0);
    };

    this.componentWillReceiveProps = function (nextProps) {
        var debug = _this2.props.debug;

        if (debug && (nextProps.config.length !== _this2.props.config.length || JSON.stringify(nextProps.config) !== JSON.stringify(_this2.props.config))) {
            _this2.reset(nextProps);
        }
    };

    this.initForm = function () {
        var initData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _this2.form.setFieldsValue(initData);
    };

    this.functionsWalk = function (initFunctions, functionTemplates, mountFunctions, yakaApis) {
        return Object.assign((0, _model.registerMountFunctions)(mountFunctions, yakaApis), (0, _model.registerFunctions)(initFunctions, functionTemplates, yakaApis));
    };

    this.modelWalk = function () {
        var initModels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        Object.assign(_this2.functions, (0, _model.models)(initModels, _this2.yakaApis));
    };

    this.dataMapWalk = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        Object.assign(state, (0, _model.dataMap)(_this2.dataMap, _this2.yakaApis));
    };

    this.stateWalk = function () {
        var layouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var initData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _this2.setState((0, _model.stateWalk)(layouts, initData));
    };
};