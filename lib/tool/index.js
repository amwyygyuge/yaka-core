// 数据流入解析
const streamTo = (arr = [], obj, target) => {
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
const streamForm = (arr = [], obj, data) => {
    if (arr.length === 0) return obj
    let _obj = {}
    const str = arr.shift()
    const keys = str.split('[')
    if (data !== undefined) {
        if (keys.length === 1) {
            _obj = data[keys[0]]
        } else {
            const num = parseInt(keys[1].replace(']', ''), 0)
            _obj = data[keys[0]][num]
        }
    } else {
        if (obj === undefined) {
            return null
        } else {
            if (keys.length === 1) {
                _obj = obj[keys[0]]
            } else {
                const num = parseInt(keys[1].replace(']', ''), 0)
                _obj = obj[keys[0]][num]
            }
        }
    }
    return streamForm(arr, _obj)
}
// 读取state
const readState = (key, state) => {
    if (!key || !state) { return false }
    const redirect = key.toString().slice(1, key.length).split('.')
    const data = streamForm(redirect, {}, state)
    if (typeof data === 'function') {
        return data()
    } else {
        return data
    }
}
// 检查是否为读取state
const isReadState = (key = '') => {
    if (!key) { return false }
    return key.toString().indexOf('$') !== -1
}



export {
    readState, isReadState, streamTo, streamForm
}