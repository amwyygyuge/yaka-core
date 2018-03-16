const getLogicMapComponent = (ele, initData) => {
    const logicState = {}
    if (ele.component === 'Logic' && ele.props && ele.props.value) {
        const key = ele.props.value
        if (key.indexOf('$') > -1) {
            const formKey = key.slice(1, key.length).split('.')
            const value = initData[formKey[0]] || ''
            logicState[formKey[0]] = {}
            logicState[formKey[0]][formKey[1]] = value
        }
    }
    return logicState
}
const stateWalk = (layouts, initData) => {
    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!')
    }
    const state = {},
        logicState = {}
    layouts.forEach(ele => {
        // 收集state
        if (ele.state) {
            const _state = {}
            const component_state = {}
            Object.keys(ele.state).forEach(key => {
                component_state[key] = ele.state[key]
            })
            _state[ele.name] = component_state
            Object.assign(state, _state)
        }

        if (ele.children) {
            Object.assign(state, stateWalk(ele.children, initData))
        }
        // 收集逻辑组件
        Object.assign(state, getLogicMapComponent(ele, initData))
    })
    return Object.assign(state, logicState)
}
export default stateWalk