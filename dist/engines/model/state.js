'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogicMapComponent = function getLogicMapComponent(ele, initData) {
    var logicState = {};
    if (ele.component === 'Logic' && ele.props && ele.props.value) {
        var key = ele.props.value;
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
    var state = {},
        logicState = {};
    layouts.forEach(function (ele) {
        // 收集state
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
            Object.assign(state, stateWalk(ele.children, initData));
        }
        // 收集逻辑组件
        Object.assign(state, getLogicMapComponent(ele, initData));
    });
    return Object.assign(state, logicState);
};
exports.default = stateWalk;