import React, { Component, Children } from 'react'
import { isReadState, readState } from './../../tool';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
const bindingText = (text, getState, getMountData) => {
    const children = []
    if (text) {
        if (isReadState(text)) {
            // #
            const text = readState(text, getState())
            children.push(text)
        } else {
            // @
            if (text.indexOf('@') !== -1) {
                const name = text.slice(1, text.length)
                const props = getMountData()
                children.push(props[name])
            } else {
                // 普通数据
                children.push(text)
            }
        }
    }
    return children
}
const componentCheck = ele => {
    const rex = /^[A-Za-z0-9]+$/
    if (!rex.test(ele)) {
        return false
    } else {
        return true
    }
}
const bindingProps = ({ name, props = {} }, { getState, getFunction, getMountData }) => {
    const _state = Object.assign({}, props)
    if (props) {
        Object.keys(props).forEach(key => {
            if (typeof props[key] === 'string') {
                //重定向到state
                if (isReadState(props[key])) {
                    _state[`${key}`] = readState(props[key], getState())
                    return false
                }
                // 绑定函数
                if (props[key].indexOf('*') !== -1) {
                    const redirect = props[key].slice(1, props[key].length)
                    _state[`${key}`] = getFunction()[redirect]
                    return false
                }
                // 绑定外部props
                if (props[key].indexOf('@') !== -1) {
                    const redirect = props[key].slice(1, props[key].length)
                    const obj = {}
                    _state[`${key}`] = getMountData()[redirect]
                    return false
                }
            }
        })
    }
    return _state
}
const componentFilter = (item, yakaApis, level, index) => {
    const { getState, getComponent, getForm, getInitData, getMountData } = yakaApis
    const { ele, subs, text, eleGroup, name } = item
    const props = bindingProps(item, yakaApis)
    props.key = `${level}.${index}`
    if (props.show === false) { return null }
    const { components, layoutComponents, extend } = getComponent()
    const apis = { yakaApis, elementWalk, componentCheck, initData: getInitData(), components, form: getForm(), bindingProps }
    //布局组件
    if (layoutComponents[ele]) {
        return layoutComponents[ele](item, apis, props)
    }
    //组件扩展
    if (extend[ele]) {
        return extend[ele](item, apis, props)
    }
    //常规组件
    const children = bindingText(text, getState, getMountData),
        component = components[ele] ? components[ele] : ele
    if (subs) {
        Object.assign(children, elementWalk(subs, yakaApis, props.key))
    }
    let Element = null
    if (ele === 'Input' || ele === 'input' || ele === 'TextArea') {
        Element = React.createElement(component, props)
    } else {
        Element = React.createElement(component, props, children)
    }
    return Element
}
const elementWalk = (layouts, yakaApis, level) => {

    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!')
    }
    return layouts.map((item, index) => {
        const { ele } = item
        if (!ele || !componentCheck(ele)) return false
        return componentFilter(item, yakaApis, level, index)
    })
}
export default elementWalk