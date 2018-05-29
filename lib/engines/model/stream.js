import { readState, isReadState, streamForm, streamTo } from './../../tool';


// 数据分流
const streamFilter = (streamIn, data) => {
    let val = null
    switch (typeof streamIn) {
        //数据别名
        case 'object':
            if (streamIn.path) {
                val = streamForm(streamIn.path.toString().split('.'), {}, data)
                if (streamIn.alias) {
                    Object.keys(streamIn.alias).forEach(aliasKey => {
                        const alias = streamIn.alias[aliasKey]
                        Array.isArray(val) && val.map(item => {
                            item[aliasKey] = item[alias]
                            return item
                        })
                    })
                }
                return val;
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
                val = streamIn.indexOf('.') !== -1 ? streamForm(streamIn.split('.'), {}, data) : streamIn
                return val;
            }
        default:
            return val;
    }
}
// 数据流遍历
const streamWalk = (streams = {}, data, yakaApis) => {
    const state = {}
    const { formValueSettingFunction, stateValueSettingFunction, formValueGettingFunction, getProps } = yakaApis
    Object.keys(streams).forEach(key => {
        key = key.toString()
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
    streamFilter
}
export default streamWalk