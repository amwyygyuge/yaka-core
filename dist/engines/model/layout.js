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
var componentFctory = function componentFctory(_ref3) {
    var item = _ref3.item,
        yakaApis = _ref3.yakaApis,
        level = _ref3.level,
        index = _ref3.index;

    var Element = null;
    var getState = yakaApis.getState,
        getComponent = yakaApis.getComponent,
        getForm = yakaApis.getForm,
        getInitData = yakaApis.getInitData,
        getMountData = yakaApis.getMountData;
    var ele = item.ele,
        subs = item.subs,
        text = item.text,
        eleGroup = item.eleGroup;

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
        Element = layoutComponents[ele](item, apis, props);
        return { Element: Element, key: props.key };
    }
    //组件扩展
    if (extend[ele]) {
        Element = extend[ele](item, apis, props);
        return { Element: Element, key: props.key };
    }
    //常规组件
    var children = bindingText(text, getState, getMountData),
        component = components[ele] ? components[ele] : ele;
    if (subs) {
        Object.assign(children, elementWalk(subs, yakaApis, props.key));
    }
    if (ele === 'Input' || ele === 'input' || ele === 'TextArea') {
        Element = _react2.default.createElement(component, props);
    } else {
        Element = _react2.default.createElement(component, props, children);
    }
    return { Element: Element, key: props.key };
};

var componentPlugin = function componentPlugin(Element, key, _ref4) {
    var item = _ref4.item,
        yakaApis = _ref4.yakaApis,
        formCreatFunc = _ref4.formCreatFunc;
    var isDevelop = yakaApis.isDevelop,
        getPlugIn = yakaApis.getPlugIn;

    var plugIns = getPlugIn();
    var eleConfig = {
        config: item,
        key: key
    };
    var plugInApi = {
        debug: isDevelop(),
        formCreatFunc: formCreatFunc,
        yakaApis: yakaApis
    };
    plugIns.forEach(function (func) {
        Element = Element && func(Element, eleConfig, plugInApi);
    });
    // 开发模式
    if (isDevelop()) {
        Element = Element && (0, _index.json_preview)(Element, eleConfig, plugInApi);
    } else {
        if (formCreatFunc) {
            Element = formCreatFunc(Element);
        }
    }
    return Element;
};

var componentFilter = function componentFilter(item, yakaApis, level, index, formCreatFunc, parent) {
    var isDevelop = yakaApis.isDevelop;
    var ele = item.ele;

    var _Element = null;
    if (!ele || !componentCheck(ele)) {
        _Element = (0, _index.quick_setup)(null, { config: item, key: level + '.' + index, parent: parent }, { debug: isDevelop(), yakaApis: yakaApis, formCreatFunc: formCreatFunc });
    } else {
        // 配置转化
        var _componentFctory = componentFctory({ item: item, yakaApis: yakaApis, level: level, index: index }),
            Element = _componentFctory.Element,
            key = _componentFctory.key;
        // 插件扩展


        _Element = componentPlugin(Element, key, { item: item, yakaApis: yakaApis, formCreatFunc: formCreatFunc });
    }
    return _Element;
};
var elementWalk = function elementWalk(layouts, yakaApis, level, formCreatFunc, parent) {
    if (!Array.isArray(layouts)) throw Error('children must be an array!');
    // const length = layouts.length
    // if (Object.keys(layouts[length - 1]).length !== 0) {
    //     layouts.push({})
    // }
    return layouts.map(function (item, index) {
        return componentFilter(item, yakaApis, level, index, formCreatFunc, parent);
    });
};
exports.default = elementWalk;