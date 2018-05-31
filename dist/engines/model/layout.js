'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tool = require('./../../tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindingText = function bindingText(ele, getState, getProps) {
    var children = [];
    if (ele.text) {
        if ((0, _tool.isReadState)(ele.text)) {
            // #
            var text = (0, _tool.readState)(ele.text, getState());
            children.push(text);
        } else {
            // @
            if (ele.text.indexOf('@') !== -1) {
                var name = ele.text.slice(1, ele.text.length);
                var props = getProps();
                children.push(props[name]);
            } else {
                // 普通数据
                children.push(ele.text);
            }
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
var bindingProps = function bindingProps(_ref, _ref2) {
    var name = _ref.name,
        _ref$props = _ref.props,
        props = _ref$props === undefined ? {} : _ref$props;
    var getState = _ref2.getState,
        getFunction = _ref2.getFunction,
        getProps = _ref2.getProps;

    var _state = Object.assign({ key: name }, props);
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
                    _state['' + key] = getProps()[_redirect];
                    return false;
                }
            }
        });
    }
    return _state;
};
var componentFilter = function componentFilter(ele, yakaApis) {
    var getState = yakaApis.getState,
        getComponent = yakaApis.getComponent,
        getForm = yakaApis.getForm,
        getInitData = yakaApis.getInitData,
        getProps = yakaApis.getProps;

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
    var children = bindingText(ele, getState, getProps),
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