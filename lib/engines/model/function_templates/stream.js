import { readState, isReadState, streamForm, streamTo } from './../../../tool';
// 数据分流
const streamFilter = (streamIn, data) => {
    let value = null
    switch (typeof streamIn) {
        //数据别名
        case 'object':
            if (streamIn.path) {
                value = streamForm(streamIn.path.toString().split('.'), {}, data)
                if (streamIn.alias) {
                    Object.keys(streamIn.alias).forEach(aliasKey => {
                        const alias = streamIn.alias[aliasKey]
                        Array.isArray(val) && val.map(item => {
                            item[aliasKey] = item[alias]
                            return item
                        })
                    })
                }
                return value;
            } else {
                return streamIn
            }
        //布尔类型
        case 'boolean':
            return streamIn;
        case 'string':
            if (streamIn === 'self') {
                return data
            } else {
                value = streamIn.indexOf('.') !== -1 ? streamForm(streamIn.split('.'), {}, data) : streamIn
                return value;
            }
        default:
            return value;
    }
}
// 数据流遍历
const streamWalk = (streams = {}, data, yakaApis) => {
    return () => {
        const state = {}
        const { formValueSettingFunction, stateValueSettingFunction, formValueGettingFunction, getMountData } = yakaApis
        Object.keys(streams).forEach(key => {
            key = key.toString()
            const value = streamFilter(streams[key], data)
            const key_arr = key.slice(1, key.length).split('.')
            //表单数据流        
            if (key.indexOf('#') !== -1) {
                if (key_arr.length === 1) {
                    const stream = streamTo(key_arr, {}, value)
                    formValueSettingFunction(stream)
                } else {
                    const formKey = key_arr
                    const formValues = formValueGettingFunction(formKey[0])
                    formValues[formKey[1]] = value
                    const obj = {}
                    obj[formKey[0]] = formValues
                    formValueSettingFunction(stream)
                }
            }
            //state数据流
            if (isReadState(key)) {
                const stream = streamTo(key_arr, {}, value)
                Object.assign(state, stream)
            }
            // 外部接口接受
            if (key.indexOf('@') !== -1) {
                const props = getMountData()
                const name = key.slice(1, key.length)
                typeof props[name] === 'function' ? props[name](value) : console.error('props is not a funciton!')
            }
        })
        stateValueSettingFunction(state)
    }
}
export {
    streamFilter
}
export default streamWalk