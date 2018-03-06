
const streamTo = (arr, obj, target) => {
    if (arr.length === 0) return obj
    const _obj = {}
    if (target !== undefined) {
        _obj[arr.pop()] = target
    } else {
        _obj[arr.pop()] = obj
    }
    return streamTo(arr, _obj)
}
const streamForm = (arr, obj, data) => {
    if (arr.length === 0) return obj
    let _obj = {}
    if (data !== undefined) {
        _obj = data[arr.shift()]
    } else {
        if (obj === undefined) {
            return null
        } else {
            _obj = obj[arr.shift()]
        }
    }
    return streamForm(arr, _obj)
}
const readState = (key, state) => {
    const redirect = key.slice(1, key.length).split('.')
    const data = streamForm(redirect, {}, state)
    if (typeof data === 'function') {
        return data()
    } else {
        return data
    }
}
const isReadState = (key) => {
    return key.indexOf('$') !== -1
}
const streamFilter = (streamIn, data) => {
    let val = null
    switch (typeof streamIn) {
        //数据别名
        case 'object':
            val = streamForm(streamIn.path.split('.'), {}, data)
            Object.keys(streamIn.alias).forEach(aliasKey => {
                const alias = streamIn.alias[aliasKey]
                val.map(item => {
                    item[aliasKey] = item[alias]
                    return item
                })
            })
            return val;
        //布尔类型
        case 'boolean':
            return streamIn;
        case 'string':
            val = streamIn.indexOf('.') !== -1 ? streamForm(streamIn.split('.'), {}, data) : data
            return val;
        default:
            return val;
    }
}
const streamWalk = (streams, data, yakaApis) => {
    const state = {}
    const { formValueSettingFunction, stateValueSettingFunction, formValueGettingFunction } = yakaApis
    Object.keys(streams).forEach(key => {
        const val = streamFilter(streams[key], data)
        if (key.indexOf('#') !== -1) {
            //表单数据流
            if (key.slice(1, key.length).split('.').length === 1) {
                const stream = streamTo(key.slice(1, key.length).split('.'), {}, val)
                formValueSettingFunction(stream)
            } else {
                const formKey = key.slice(1, key.length).split('.')
                const formValues = formValueGettingFunction(formKey[0])
                formValues[formKey[1]] = val
                const obj = {}
                obj[formKey[0]] = formValues
                formValueSettingFunction(stream)
            }
        }
        //state数据流
        if (isReadState(key)) {
            const stream = streamTo(key.slice(1, key.length).split('.'), {}, val)
            Object.assign(state, stream)
        }
    })
    stateValueSettingFunction(state)
}

export {
    streamTo, streamForm, readState, isReadState, streamWalk, streamFilter
}