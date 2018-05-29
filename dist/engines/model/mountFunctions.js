"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mountFunctions = function mountFunctions() {
    var mountFunctions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var data = arguments[1];
    var yakaApis = arguments[2];

    var state = {};
    var getMountFunctions = yakaApis.getMountFunctions,
        formValueSettingFunction = yakaApis.formValueSettingFunction,
        stateValueSettingFunction = yakaApis.stateValueSettingFunction,
        formValueGettingFunction = yakaApis.formValueGettingFunction,
        getProps = yakaApis.getProps;

    Object.keys(mountFunctions).forEach(function (key) {
        key = key.toString();
        var functions = getMountFunctions()[key];
        functions && functions(data, yakaApis);
        // //表单数据流        
        // if (key.indexOf('#') !== -1) {
        //     if (key.slice(1, key.length).split('.').length === 1) {
        //         const stream = streamTo(key.slice(1, key.length).split('.'), {}, val)
        //         formValueSettingFunction(stream)
        //     } else {
        //         const formKey = key.slice(1, key.length).split('.')
        //         const formValues = formValueGettingFunction(formKey[0])
        //         formValues[formKey[1]] = val
        //         const obj = {}
        //         obj[formKey[0]] = formValues
        //         formValueSettingFunction(stream)
        //     }
        // }
        // //state数据流
        // if (isReadState(key)) {
        //     const stream = streamTo(key.slice(1, key.length).split('.'), {}, val)
        //     Object.assign(state, stream)
        // }
        // // 外部接口接受
        // if (key.indexOf('@') !== -1) {
        //     const props = getProps()
        //     const name = key.slice(1, key.length)
        //     typeof props[name] === 'function' ? props[name](val) : console.error('props is not a funciton!')
        // }
    });
};
exports.default = mountFunctions;