
// 数据流入解析
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
// 数据流出解析
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
// 读取state
const readState = (key, state) => {
    const redirect = key.slice(1, key.length).split('.')
    const data = streamForm(redirect, {}, state)
    if (typeof data === 'function') {
        return data()
    } else {
        return data
    }
}
// 检查是否为读取state
const isReadState = (key) => {
    return key.indexOf('$') !== -1
}
// 数据分流
const streamFilter = (streamIn, data) => {
    let val = null
    switch (typeof streamIn) {
        //数据别名
        case 'object':
            val = streamForm(streamIn.path.split('.'), {}, data)
            if (streamIn.alias) {
                Object.keys(streamIn.alias).forEach(aliasKey => {
                    const alias = streamIn.alias[aliasKey]
                    val.map(item => {
                        item[aliasKey] = item[alias]
                        return item
                    })
                })
            }
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
// 数据流遍历
const streamWalk = (streams, data, yakaApis) => {
    const state = {}
    const { formValueSettingFunction, stateValueSettingFunction, formValueGettingFunction, getProps } = yakaApis
    Object.keys(streams).forEach(key => {
        const val = streamFilter(streams[key], data)
        //表单数据流        
        if (key.indexOf('#') !== -1) {
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
        // 外部接口接受
        if (key.indexOf('@') !== -1) {
            const props = getProps()
            const name = key.slice(1, key.length)
            typeof props[name] === 'function' ? props[name](val) : console.error('props is not a funciton!')
        }
    })
    stateValueSettingFunction(state)
}

export {
    streamTo, streamForm, readState, isReadState, streamWalk, streamFilter
}