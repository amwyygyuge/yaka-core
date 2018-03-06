import { streamWalk, isReadState, readState } from './../../tool/';
import BsFetch from 'igroot-fetch'
const modelFactory = (model, yakaApis) => {
    const { getState } = yakaApis
    return (auto = false) => {
        const params = {}
        if (auto !== true && model.params) {
            Object.keys(model.params).forEach(key => {
                const value = model.params[key]
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
        BsFetch(model.url).get(params).then(res => {
            streamWalk(model.streams, res, yakaApis)
        })
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