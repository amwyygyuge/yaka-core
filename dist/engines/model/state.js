'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogicMapComponent = function getLogicMapComponent(ele, initData) {
    var logicState = {};
    if (ele.component === 'Logic' && ele.props && ele.props.value) {
        var key = ele.props.value.toString();
        if (key.indexOf('$') > -1) {
            var formKey = key.slice(1, key.length).split('.');
            var value = initData[formKey[0]] || '';
            logicState[formKey[0]] = {};
            logicState[formKey[0]][formKey[1]] = value;
        }
    }
    return logicState;
};
var stateWalk = function stateWalk(layouts, initData) {
    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!');
    }
    var _state = {},
        logicState = {};
    layouts.forEach(function (ele) {
        var state = ele.state,
            name = ele.name,
            children = ele.children;
        // 收集state

        if (state) {
            var eleState = {};
            var component_state = {};
            Object.keys(state).forEach(function (key) {
                component_state[key] = state[key];
            });
            eleState[name] = component_state;
            Object.assign(_state, eleState);
        }

        if (children) {
            Object.assign(_state, stateWalk(children, initData));
        }
        // 收集逻辑组件
        Object.assign(_state, getLogicMapComponent(ele, initData));
    });
    return Object.assign(_state, logicState);
};
exports.default = stateWalk;