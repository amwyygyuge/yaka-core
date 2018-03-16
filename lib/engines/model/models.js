import { streamWalk, isReadState, readState } from './../../tool/';
import BsFetch from 'igroot-fetch'
const modelFactory = (model, yakaApis) => {
    const { type,params,url,streams} = model
    const { getState } = yakaApis
    return (auto = false) => {
        const params = {}
        if (auto !== true && params) {
            Object.keys(params).forEach(key => {
                const value = params[key]
                if (isReadState(value)) {
                    const val = readState(value, getState())
                    params[key] = val
                    return
                }
                if (value.indexOf('#') !== -1) {
                    const val = formValueGettingFunction(value.slice(1, value.length))
                    params[key] = val
                    return
                }
                params[key] = value
            })
        }
        if (type === 'get') {
            BsFetch(url).get(params).then(res => {
                streamWalk(streams, res, yakaApis)
            })
        }
        if (type === 'post') {
            BsFetch(url).post(params).then(res => {
                streamWalk(streams, res, yakaApis)
            })
        }
    }
}
const models = (models, yakaApis) => {
    const _models = {}
    Object.keys(models || {}).forEach(key => {
        const model = models[key]
        _models[key] = modelFactory(model, yakaApis)
        if (model.action === 'auto') {
            _models[key](true)
        }
    })
    return _models

}
export default models