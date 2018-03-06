import { streamWalk } from './../../tool/';
const functions = (functions, yakaApis) => {
    const _functions = {}
    Object.keys(functions || {}).forEach(key => {
        _functions[key] = (e) => {
            streamWalk(functions[key].streams, e, yakaApis)
        }
    })
    return _functions
}
export default functions