'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tool = require('./../../tool');

var _index = require('./../../plugIn/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindingText = function bindingText(text, getState, getMountData) {
    var children = [];
    if (text) {
        if ((0, _tool.isReadState)(text)) {
            // $全局数据
            var _text = (0, _tool.readState)(_text, getState());
            children.push(_text);
        } else {
            // @
            if (text.indexOf('@') !== -1) {
                var name = text.slice(1, text.length);
                var props = getMountData();
                children.push(props[name]);
            } else {
                // 普通数据
                children.push(text);
            }
        }
    }
    return children;
};
var componentCheck = function componentCheck(ele) {
    var rex = /^[A-Za-z0-9]+$/;
    if (!rex.test(ele)) {
        return false;
    } else {
        return true;
    }
};
var bindingProps = function bindingProps(_ref, _ref2) {
    var _ref$props = _ref.props,
        props = _ref$props === undefined ? {} : _ref$props;
    var getState = _ref2.getState,
        getFunction = _ref2.getFunction,
        getMountData = _ref2.getMountData;

    var _state = Object.assign({}, props);
    if (props) {
        Object.keys(props).forEach(function (key) {
            if (typeof props[key] === 'string') {
                //重定向到state
                if ((0, _tool.isReadState)(props[key])) {
                    _state['' + key] = (0, _tool.readState)(props[key], getState());
                    return false;
                }
                // 绑定函数
                if (props[key].indexOf('*') !== -1) {
                    var redirect = props[key].slice(1, props[key].length);
                    _state['' + key] = getFunction()[redirect];
                    return false;
                }
                // 绑定外部props
                if (props[key].indexOf('@') !== -1) {
                    var _redirect = props[key].slice(1, props[key].length);
                    _state['' + key] = getMountData()[_redirect];
                    return false;
                }
            }
        });
    }
    return _state;
};
var componentFilter = function componentFilter(item, yakaApis, level, index, formCreatFunc) {
    var getState = yakaApis.getState,
        getComponent = yakaApis.getComponent,
        getForm = yakaApis.getForm,
        getInitData = yakaApis.getInitData,
        getMountData = yakaApis.getMountData,
        isDevelop = yakaApis.isDevelop,
        getPlugIn = yakaApis.getPlugIn;
    var ele = item.ele,
        subs = item.subs,
        text = item.text,
        eleGroup = item.eleGroup,
        name = item.name;

    var props = bindingProps(item, yakaApis);
    if (props.show === false) {
        return null;
    }
    props.key = level + '.' + index;

    var _getComponent = getComponent(),
        components = _getComponent.components,
        layoutComponents = _getComponent.layoutComponents,
        extend = _getComponent.extend;

    var apis = { yakaApis: yakaApis, elementWalk: elementWalk, componentCheck: componentCheck, initData: getInitData(), components: components, form: getForm(), bindingProps: bindingProps
        //布局组件
    };if (layoutComponents[ele]) {
        return layoutComponents[ele](item, apis, props);
    }
    //组件扩展
    if (extend[ele]) {
        return extend[ele](item, apis, props);
    }
    //常规组件
    var children = bindingText(text, getState, getMountData),
        component = components[ele] ? components[ele] : ele;
    if (subs) {
        Object.assign(children, elementWalk(subs, yakaApis, props.key));
    }
    var Element = null;
    if (ele === 'Input' || ele === 'input' || ele === 'TextArea') {
        Element = _react2.default.createElement(component, props);
    } else {
        Element = _react2.default.createElement(component, props, children);
    }
    // 插件扩展
    var getPlugIns = getPlugIn();
    var eleConfig = {
        config: item,
        key: props.key
    };
    var plugInApi = {
        debug: isDevelop(),
        formCreatFunc: formCreatFunc,
        yakaApis: yakaApis
    };
    getPlugIns.forEach(function (func) {
        Element = Element && func(Element, eleConfig, plugInApi);
    });
    // 开发模式
    if (isDevelop()) {
        Element = Element && (0, _index.json_preview)(Element, eleConfig, plugInApi);
    }
    return Element;
};
var elementWalk = function elementWalk(layouts, yakaApis, level, formCreatFunc) {
    if (!Array.isArray(layouts)) throw Error('children must be an array!');
    return layouts.map(function (item, index) {
        var ele = item.ele;

        if (!ele || !componentCheck(ele)) return false;
        return componentFilter(item, yakaApis, level, index, formCreatFunc);
    });
};
exports.default = elementWalk;