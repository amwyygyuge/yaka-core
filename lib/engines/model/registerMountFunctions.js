const registerMountFunctions = (mountFunctions = {}, yakaApis) => {
    const _mountFunctions = {}
    Object.keys(mountFunctions).forEach(key => {
        if (typeof mountFunctions[key] === 'function') {
            _mountFunctions[key] = e => mountFunctions[key](e, yakaApis)
        } else {
            _mountFunctions[key] = e => { }
            console.error(`mountFunctions ${key} must be a function!`)
        }
    })
    return _mountFunctions
}
export default registerMountFunctions