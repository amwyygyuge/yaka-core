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
            },
            getProps: function getProps() {
                return _this.props;
            }
        };
        return _this;
    }

    _createClass(Yaka, [{
        key: 'render',
        value: function render() {
            return (0, _model.layout)(this.layouts, this.yakaApis);
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
        _this2.init();
    };

    this.componentDidMount = function () {
        //载入初始表单数据
        _this2.initForm(_this2.initData);
        _this2.yakaDidMount();
    };

    this.yakaDidMount = function () {};

    this.init = function () {
        var config = _this2.config,
            layouts = _this2.layouts,
            initData = _this2.initData,
            state = _this2.state;
        var models = config.models,
            functions = config.functions;
        //函数遍历

        _this2.functionsWalk(functions);
        //函数绑定
        //state遍历
        _this2.stateWalk(layouts, initData);
        //数据映射遍历
        //model遍历
        _this2.modelWalk(models);
        _this2.dataMapWalk(state);
        _this2.yakaWillMount();
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
        }, 100);
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

    this.functionsWalk = function () {
        var initFunctions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        Object.assign(_this2.functions, (0, _model.functions)(initFunctions, _this2.yakaApis));
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