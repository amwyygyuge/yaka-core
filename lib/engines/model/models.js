import { isReadState, readState } from './../../tool/';
import BsFetch from 'igroot-fetch'
import _mountFunctions from './mountFunctions';
import streamWalk from './stream';

const modelFactory = (model, yakaApis) => {
    const { type, params, url, streams, headers = {}, mountFunctions } = model
    const { getState, getProps, formValueGettingFunction, getInitData } = yakaApis
    Object.keys(headers).forEach(key => {
        const val = headers[key] ? headers[key].toString() : ''
        if (isReadState(val)) {
            headers[key] = readState(val, getState())
        }
        if (val.indexOf('@') !== -1) {
            const name = val.slice(1, val.length)
            if (getProps()[name]) {
                headers[key] = getProps()[name]
            }
        }
    })


    return (auto = false) => {
        if (params) {
            Object.keys(params).forEach(key => {
                const value = params[key] ? params[key].toString() : null;
                if (isReadState(value)) {
                    const val = readState(value, getState())
                    params[key] = val
                    return
                }
                if (value && value.indexOf('#') !== -1) {
                    let val = ''
                    if (auto) {
                        val = getInitData()[value.slice(1, value.length)]
                    } else {
                        val = formValueGettingFunction(value.slice(1, value.length))
                    }
                    params[key] = val
                    return
                }
                params[key] = value
            })
        }
        if (type === 'get' || type === 'restful') {
            BsFetch(url, { headers, handleHttpErrors: () => { } }).get(params).then(res => {
                const code = res.code.toString()
                if (code && code !== '0') {
                    return
                }
                mountFunctions && _mountFunctions(mountFunctions, res, yakaApis)
                streams && streamWalk(streams, res, yakaApis)
            })
        }
        if (type === 'post') {
            BsFetch(url, { headers, handleHttpErrors: () => { } }).post(params).then(res => {
                const code = res.code.toString()
                if (code && code !== '0') {
                    return
                }
                mountFunctions && _mountFunctions(mountFunctions, res, yakaApis)
                streams && streamWalk(streams, res, yakaApis)
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