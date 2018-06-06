'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var rulesWalk = function rulesWalk(layouts) {
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
            Object.assign(rules, rulesWalk(ele.children));
        }
    });
    return rules;
};
exports.default = rulesWalk;