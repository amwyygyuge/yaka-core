'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tool = require('./../../tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindingText = function bindingText(ele, getState) {
    var children = [];
    if (ele.text) {
        if ((0, _tool.isReadState)(ele.text)) {
            var text = (0, _tool.readState)(ele.text, getState());
            children.push(text);
        } else {
            children.push(ele.text);
        }
    }
    return children;
};
var componentCheck = function componentCheck(ele) {
    var component = ele.component;

    var rex = /^[A-Za-z0-9]+$/;
    if (!rex.test(component)) {
        return false;
    } else {
        return true;
    }
};
var bindingProps = function bindingProps(ele, yakaApis) {
    var getState = yakaApis.getState,
        getFunction = yakaApis.getFunction;

    var props = { key: ele.name };
    if (ele.props) {
        var _state = Object.assign({}, ele.props);
        Object.keys(ele.props).forEach(function (key) {
            if (typeof ele.props[key] === 'string') {
                //重定向到state
                if ((0, _tool.isReadState)(ele.props[key])) {
                    _state['' + key] = (0, _tool.readState)(ele.props[key], getState());
                    return false;
                }
                //绑定函数
                if (ele.props[key].indexOf('*') !== -1) {
                    var redirect = ele.props[key].slice(1, ele.props[key].length);
                    _state['' + key] = getFunction()[redirect];
                    return false;
                }
            }
        });
        Object.assign(props, _state);
    }
    return props;
};
var componentFilter = function componentFilter(ele, yakaApis) {
    if (!yakaApis) {
        console.log(ele);
    }
    var getState = yakaApis.getState,
        getComponent = yakaApis.getComponent,
        getForm = yakaApis.getForm,
        getInitData = yakaApis.getInitData;

    var props = bindingProps(ele, yakaApis);
    if (props.show === false) {
        return null;
    }

    var _getComponent = getComponent(),
        components = _getComponent.components,
        layoutComponents = _getComponent.layoutComponents,
        extend = _getComponent.extend;
    //布局组件


    if (layoutComponents[ele.component]) {
        return layoutComponents[ele.component](ele, { elementWalk: elementWalk, componentFilter: componentFilter, bindingProps: bindingProps, bindingText: bindingText, componentCheck: componentCheck, yakaApis: yakaApis, form: getForm() });
    }
    //组件扩展
    if (extend[ele.component]) {
        return extend[ele.component](ele, { yakaApis: yakaApis, elementWalk: elementWalk, componentCheck: componentCheck, initData: getInitData(), components: components, form: getForm(), bindingProps: bindingProps });
    }
    //常规组件
    var children = bindingText(ele, getState),
        component = components[ele.component] ? components[ele.component] : ele.component;
    if (ele.children) {
        Object.assign(children, elementWalk(ele.children, yakaApis));
    }

    var Element = _react2.default.createElement(component, props, children);
    if (ele.component === 'Input' || ele.component === 'input' || ele.component === 'TextArea') {
        Element = _react2.default.createElement(component, props);
    }
    return Element;
};
var elementWalk = function elementWalk(layouts, yakaApis) {
    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!');
    }
    return layouts.map(function (ele) {
        if (!ele.component || !componentCheck(ele)) return false;
        return componentFilter(ele, yakaApis);
    });
};
exports.default = elementWalk;