import { isReadState, readState } from './../../../tool/';
import BsFetch from 'igroot-fetch'
import streamWalk from './stream';

const yakaFetch = (model, e, yakaApis) => {
    const { type, params, url, streams, headers = {}, mountFunctions } = model
    const { getState, getMountData, formValueGettingFunction, getInitData, getForm } = yakaApis
    // const { getFieldsValue } = getForm()
    // console.log(getFieldsValue());
    Object.keys(headers).forEach(key => {
        const val = headers[key] ? headers[key].toString() : ''
        if (isReadState(val)) {
            headers[key] = readState(val, getState())
        }
        if (val.indexOf('@') !== -1) {
            const name = val.slice(1, val.length)
            if (getMountData()[name]) {
                headers[key] = getMountData()[name]
            }
        }
    })
    return () => {
        let _params = {}
        if (params) {
            Object.keys(params).forEach(key => {
                const value = params[key] ? params[key].toString() : '';
                if (isReadState(value)) {
                    const val = readState(value, getState())
                    _params[key] = val
                    return
                }
                if (value.indexOf('#') !== -1) {
                    let val = formValueGettingFunction(value.slice(1, value.length))
                    // if (auto) {
                    //     val = getInitData()[value.slice(1, value.length)]
                    // } else {
                    //     val = formValueGettingFunction(value.slice(1, value.length))
                    // }
                    if (typeof val === 'object' && val.key && val.label) {
                        val = val.key
                    }
                    _params[key] = val
                    return
                }
                _params[key] = value
            })
        }
        if (type === 'get' || type === 'restful') {
            BsFetch(url, { headers, handleHttpErrors: () => { } }).get(_params).then(res => {
                const code = res.code.toString()
                if (code && code !== '0') {
                    return
                }
                streams && streamWalk(streams, res, yakaApis)()
            })
        }
        if (type === 'post') {
            BsFetch(url, { headers, handleHttpErrors: () => { } }).post(_params).then(res => {
                const code = res.code.toString()
                if (code && code !== '0') {
                    return
                }
                streams && streamWalk(streams, res, yakaApis)()
            })
        }
    }
}
// const models = (models, e, yakaApis) => {
//     const _models = {}
//     Object.keys(models || {}).forEach(key => {
//         const model = models[key]
//         _models[key] = modelFactory(model, e, yakaApis)
//     })
//     return _models
// }
export default yakaFetch