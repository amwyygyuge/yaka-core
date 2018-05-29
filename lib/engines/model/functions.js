import streamWalk from './stream';
import mountFunctions from './mountFunctions';
const functions = (functions, yakaApis) => {
    const _functions = {}
    Object.keys(functions || {}).forEach(key => {
        _functions[key] = (e) => {
            functions[key].streams && streamWalk(functions[key].streams, e, yakaApis)
            functions[key].mountFunctions && mountFunctions(functions[key].mountFunctions, e, yakaApis)
        }
    })
    return _functions
}
export default functions