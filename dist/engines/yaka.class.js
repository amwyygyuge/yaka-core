'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Yaka = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _model = require('./model');

var _extend = require('./../extend/');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Yaka = exports.Yaka = function (_PureComponent) {
    _inherits(Yaka, _PureComponent);

    function Yaka(props) {
        _classCallCheck(this, Yaka);

        // yaka props解构
        var _this = _possibleConstructorReturn(this, (Yaka.__proto__ || Object.getPrototypeOf(Yaka)).call(this, props));

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
            functionTemplates = _props$functionTempla === undefined ? {} : _props$functionTempla,
            _props$mountData = props.mountData,
            mountData = _props$mountData === undefined ? {} : _props$mountData,
            _props$plugIn = props.plugIn,
            plugIn = _props$plugIn === undefined ? [] : _props$plugIn;
        // config 对象解构

        var _config$init = config.init,
            init = _config$init === undefined ? {} : _config$init,
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
            _init$formValue = init.formValue,
            formValue = _init$formValue === undefined ? {} : _init$formValue;
        // 表单对象

        _this.form = form;
        // 表单规则
        _this.rules = {};
        // 配置
        _this.config = config;
        // 代码片段
        _this.eleGroup = eleGroup;
        // 插件
        _this.plugIn = plugIn;
        // 挂载声明周期钩子
        _this.mounted = mounted;
        // 表单对象
        _this.form = form;
        // 表单初始值
        _this.formValue = formValue;
        // state 初始化全局变量
        _this.state = state;
        _this.props = props;
        // 数据监听
        _this.watch = watch;
        _this.debug = function () {
            return props.debug ? props.debug(_this.config.layout) : false;
        };
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
                return { components: components, layoutComponents: layoutComponents, extend: _extend2.default };
            },
            getInitData: function getInitData() {
                return _this.formValue;
            },
            getMountData: function getMountData() {
                return _this.props.mountData;
            },
            isDevelop: function isDevelop() {
                return _this.debug;
            },
            getPlugIn: function getPlugIn() {
                return _this.plugIn;
            }
            // 挂载函数
        };_this.mountFunctions = _this.functionsWalk(functions, functionTemplates, mountFunctions, _this.yakaApis);
        return _this;
    }

    _createClass(Yaka, [{
        key: 'render',
        value: function render() {
            return this.yakaRender();
        }
    }, {
        key: 'componentWillUpdate',

        // 监听state变化


        // // 数据map遍历 弃用
        // dataMapWalk = (state = {}) => {
        //     Object.assign(state, dataMap(this.dataMap, this.yakaApis))
        // }

        // // 状态遍历 弃用
        // stateWalk = (layouts = [], initData = {}) => {
        //     this.setState(stateWalk(layouts, initData))
        // }

        value: function componentWillUpdate(nextProps, nextState) {
            if (this.state !== nextState) {
                this.searchWatch(nextState);
            }
        }

        // state比对函数


        // 初始化

        // 挂载结束后


        // 数据载入


        // 函数遍历

    }]);

    return Yaka;
}(_react.PureComponent);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.yakaRender = function () {
        var _layout = _this2.props.config.layout;
        return (0, _model.layout)(_layout, _this2.yakaApis, 1);
    };

    this.componentWillMount = function () {
        _this2.yakaInit();
    };

    this.searchWatch = function (nextState) {
        var watch = _this2.watch,
            state = _this2.state,
            mountFunctions = _this2.mountFunctions;

        Object.keys(state).forEach(function (key) {
            if (state[key] !== nextState[key]) {
                if (watch[key]) {
                    var functionName = watch[key].run;
                    mountFunctions[functionName] && mountFunctions[functionName]();
                }
            }
        });
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

    this.yakaDidMount = function () {};

    this.reset = function (nextProps) {
        var config = nextProps.config,
            _nextProps$mountFunct = nextProps.mountFunctions,
            mountFunctions = _nextProps$mountFunct === undefined ? {} : _nextProps$mountFunct,
            _nextProps$functionTe = nextProps.functionTemplates,
            functionTemplates = _nextProps$functionTe === undefined ? {} : _nextProps$functionTe;
        // config 对象解构

        var _config$init2 = config.init,
            init = _config$init2 === undefined ? {} : _config$init2;
        // init 对象解构

        var _init$functions2 = init.functions,
            functions = _init$functions2 === undefined ? {} : _init$functions2,
            _init$state2 = init.state,
            state = _init$state2 === undefined ? {} : _init$state2,
            _init$watch2 = init.watch,
            watch = _init$watch2 === undefined ? {} : _init$watch2,
            _init$formValue2 = init.formValue,
            formValue = _init$formValue2 === undefined ? {} : _init$formValue2;

        _this2.watch = watch;
        _this2.config = config;
        _this2.formValue = formValue;
        Object.assign(_this2.state, state);
        setTimeout(function () {
            _this2.initForm(formValue);
        }, 0);
        _this2.mountFunctions = _this2.functionsWalk(functions, functionTemplates, mountFunctions, _this2.yakaApis);
    };

    this.componentWillReceiveProps = function (nextProps) {
        var debug = _this2.debug;

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
};