'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Yaka = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
        _this.components = components;
        _this.layoutComponents = layoutComponents;
        _this.form = form;
        _this.initData = config.initData || {};
        _this.state = config.global || {};
        _this.extend = _extend2.default;
        // logic state
        _this.logicState = {};
        return _this;
    }

    _createClass(Yaka, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.elementWalk(this.layouts)
            );
        }

        //函数遍历


        //数据模型绑定和运行


        //model函数构建器


        //数据流遍历


        //数据流入过滤


        //数据流入


        //数据流出


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

        //表单规则遍历


        //dom遍历


        //非法组件拦截


        //组件分流


        //组件内容绑定


        //绑定props

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
        var functions = _this2.config.functions || {};
        var _functions = {};
        Object.keys(functions).forEach(function (key) {
            _functions[key] = function (e) {
                _this2.streamWalk(functions[key].streams, e);
            };
        });
        Object.assign(_this2.functions, _functions);
    };

    this.dataMapWalk = function () {
        var dataMap = _this2.dataMap || {};
        var _dataMap = {};
        Object.keys(dataMap).forEach(function (key) {
            _dataMap[key] = function () {
                var state = _this2.state;
                var _dataMap$key = dataMap[key],
                    value = _dataMap$key.value,
                    map = _dataMap$key.map;

                value = _this2.getState(value, state);
                var m = map.find(function (m) {
                    return m.value === value;
                });
                if (m) {
                    var _key = m.data;
                    if (_this2.isGetState(_key)) {
                        return _this2.getState(_key, state);
                    } else {
                        return _key;
                    }
                } else {
                    return null;
                }
            };
        });
        Object.assign(_this2.state, _dataMap);
    };

    this.modelWalk = function () {
        var models = _this2.config.models || {};
        var _models = {};
        Object.keys(models).forEach(function (key) {
            var model = models[key];
            _models[key] = _this2.modelFactory(model);
            if (model.action === 'auto') {
                _models[key](true);
            }
        });
        Object.assign(_this2.functions, _models);
    };

    this.modelFactory = function (model) {
        return function () {
            var auto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var params = {};
            if (auto !== true && model.params) {
                Object.keys(model.params).forEach(function (key) {
                    var value = model.params[key];
                    if (_this2.isGetState(value)) {
                        var val = _this2.getState(value, _this2.state);
                        params[key] = val;
                        return;
                    }
                    if (value.indexOf('#') !== -1) {
                        var _val = _this2.form.getFieldValue(value.slice(1, value.length));
                        params[key] = _val;
                        return;
                    }
                    params[key] = value;
                });
            }
            (0, _igrootFetch2.default)(model.url).get(params).then(function (res) {
                _this2.streamWalk(model.streams, res);
            });
        };
    };

    this.streamWalk = function (streams, data) {
        var streamTo = [];
        var state = {};
        Object.keys(streams).forEach(function (key) {
            var val = _this2.streamFilter(streams[key], data);
            if (key.indexOf('#') !== -1) {
                //表单数据流
                if (key.slice(1, key.length).split('.').length === 1) {
                    var stream = _this2.streamTo(key.slice(1, key.length).split('.'), {}, val);
                    _this2.form.setFieldsValue(stream);
                } else {
                    var formKey = key.slice(1, key.length).split('.');
                    var formValues = _this2.form.getFieldValue(formKey[0]);
                    formValues[formKey[1]] = val;
                    var obj = {};
                    obj[formKey[0]] = formValues;
                    _this2.form.setFieldsValue(obj);
                }
            }
            //state数据流
            if (_this2.isGetState(key)) {
                var _stream = _this2.streamTo(key.slice(1, key.length).split('.'), {}, val);
                Object.assign(state, _stream);
            }
        });
        _this2.setState(state);
    };

    this.streamFilter = function (streamIn, data) {
        var val = null;
        switch (typeof streamIn === 'undefined' ? 'undefined' : _typeof(streamIn)) {
            //数据别名
            case 'object':
                val = _this2.streamForm(streamIn.path.split('.'), {}, data);
                Object.keys(streamIn.alias).forEach(function (aliasKey) {
                    var alias = streamIn.alias[aliasKey];
                    val.map(function (item) {
                        item[aliasKey] = item[alias];
                        return item;
                    });
                });
                return val;
            //布尔类型
            case 'boolean':
                return streamIn;
            case 'string':
                val = streamIn.indexOf('.') !== -1 ? _this2.streamForm(streamIn.split('.'), {}, data) : data;
                return val;
            default:
                return val;
        }
    };

    this.streamTo = function (arr, obj, target) {
        if (arr.length === 0) return obj;
        var _obj = {};
        if (target !== undefined) {
            _obj[arr.pop()] = target;
        } else {
            _obj[arr.pop()] = obj;
        }
        return _this2.streamTo(arr, _obj);
    };

    this.streamForm = function (arr, obj, data) {
        if (arr.length === 0) return obj;
        var _obj = {};
        if (data !== undefined) {
            _obj = data[arr.shift()];
        } else {
            if (obj === undefined) {
                return null;
            } else {
                _obj = obj[arr.shift()];
            }
        }
        return _this2.streamForm(arr, _obj);
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

    this.rulesWalk = function (layouts) {
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
                Object.assign(rules, _this2.rulesWalk(ele.children));
            }
        });
        Object.assign(_this2.rules, rules);
        _this2.props.getFormData && _this2.props.getFormData(_this2.rules);
    };

    this.elementWalk = function (layouts) {
        if (!Array.isArray(layouts)) {
            throw Error('children must be an array!');
        }
        return layouts.map(function (ele) {
            if (!ele.component || !_this2.componentCheck(ele)) return false;
            return _this2.componentFilter(ele);
        });
    };

    this.componentCheck = function (ele) {
        var component = ele.component;

        var rex = /^[A-Za-z0-9]+$/;
        if (!rex.test(component)) {
            return false;
        } else {
            return true;
        }
    };

    this.componentFilter = function (ele) {
        var props = _this2.bindingProps(ele);
        if (props.show === false) {
            return null;
        }
        var components = _this2.components,
            layoutComponents = _this2.layoutComponents,
            extend = _this2.extend;
        //布局组件

        if (layoutComponents[ele.component]) {
            return layoutComponents[ele.component](ele, _this2);
        }
        //组件扩展
        if (extend[ele.component]) {
            return extend[ele.component](ele, _this2);
        }
        //常规组件
        var children = _this2.bindingText(ele),
            component = components[ele.component] ? components[ele.component] : ele.component;
        if (ele.children) {
            Object.assign(children, _this2.elementWalk(ele.children));
        }

        var Element = _react2.default.createElement(component, props, children);
        if (ele.component === 'Input' || ele.component === 'input' || ele.component === 'TextArea') {
            Element = _react2.default.createElement(component, props);
        }
        return Element;
    };

    this.bindingText = function (ele) {
        var children = [];
        if (ele.text) {
            if (_this2.isGetState(ele.text)) {
                var text = _this2.getState(ele.text, _this2.state);
                children.push(text);
            } else {
                children.push(ele.text);
            }
        }
        return children;
    };

    this.bindingProps = function (ele) {
        var props = { key: ele.name };
        if (ele.props) {
            var _state = Object.assign({}, ele.props);
            var state = _this2.state;
            var functions = _this2.functions;
            Object.keys(ele.props).forEach(function (key) {
                if (typeof ele.props[key] === 'string') {
                    //重定向到state
                    if (_this2.isGetState(ele.props[key])) {
                        _state['' + key] = _this2.getState(ele.props[key], state);
                        return false;
                    }
                    //绑定函数
                    if (ele.props[key].indexOf('*') !== -1) {
                        var redirect = ele.props[key].slice(1, ele.props[key].length);
                        _state['' + key] = functions[redirect];
                        return false;
                    }
                }
            });
            Object.assign(props, _state);
        }
        return props;
    };

    this.isGetState = function (key) {
        return key.indexOf('$') !== -1;
    };

    this.getState = function (key, state) {
        var redirect = key.slice(1, key.length).split('.');
        var data = _this2.streamForm(redirect, {}, state);
        if (typeof data === 'function') {
            return data();
        } else {
            return data;
        }
    };
};