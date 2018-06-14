"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var logic = function logic(Element, _ref, _ref2) {
    var config = _ref.config,
        key = _ref.key;
    var debug = _ref2.debug,
        formCreatFunc = _ref2.formCreatFunc,
        yakaApis = _ref2.yakaApis;

    if (config.hide) {
        var formValueGettingFunction = yakaApis.formValueGettingFunction;

        if (formValueGettingFunction('name') === "1000") {
            return null;
        }
    }
    return Element;
};
exports.default = logic;