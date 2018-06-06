import { readState, isReadState } from './../../tool/';
const dataMap = (dataMap = {}, yakaApis) => {
    const _dataMap = {}
    const { getState } = yakaApis
    Object.keys(dataMap).forEach(key => {
        key = key.toString()
        _dataMap[key] = () => {
            const state = getState()
            let { value, map } = dataMap[key]
            value = readState(value, state)
            const m = map.find(m => m.value === value)
            if (m) {
                const key = m.data
                if (isReadState(key)) {
                    return readState(key, state)
                } else {
                    return key
                }
            } else {
                return null
            }
        }
    })
    return _dataMap
}
export default dataMap