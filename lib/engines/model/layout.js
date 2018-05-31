import React, { Component, Children } from 'react'
import { isReadState, readState } from './../../tool';
const bindingText = (ele, getState, getProps) => {
    const children = []
    if (ele.text) {
        if (isReadState(ele.text)) {
            // #
            const text = readState(ele.text, getState())
            children.push(text)
        } else {
            // @
            if (ele.text.indexOf('@') !== -1) {
                const name = ele.text.slice(1, ele.text.length)
                const props = getProps()
                children.push(props[name])
            } else {
                // 普通数据
                children.push(ele.text)
            }
        }

    }
    return children
}
const componentCheck = ele => {
    const { component } = ele
    const rex = /^[A-Za-z0-9]+$/
    if (!rex.test(component)) {
        return false
    } else {
        return true
    }
}
const bindingProps = ({ name, props = {} }, { getState, getFunction, getProps }) => {
    const _state = Object.assign({ key: name }, props)
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
                    _state[`${key}`] = getProps()[redirect]
                    return false
                }
            }
        })
    }
    return _state
}
const componentFilter = (ele, yakaApis) => {
    const { getState, getComponent, getForm, getInitData, getProps } = yakaApis
    const props = bindingProps(ele, yakaApis)
    if (props.show === false) { return null }
    const { components, layoutComponents, extend } = getComponent()
    //布局组件
    if (layoutComponents[ele.component]) {
        return layoutComponents[ele.component](
            ele,
            { elementWalk, componentFilter, bindingProps, bindingText, componentCheck, yakaApis, form: getForm() }
        )
    }
    //组件扩展
    if (extend[ele.component]) {
        return extend[ele.component](
            ele,
            { yakaApis, elementWalk, componentCheck, initData: getInitData(), components, form: getForm(), bindingProps }
        )
    }
    //常规组件
    const children = bindingText(ele, getState, getProps),
        component = components[ele.component] ? components[ele.component] : ele.component
    if (ele.children) {
        Object.assign(children, elementWalk(ele.children, yakaApis))
    }

    let Element = React.createElement(component, props, children)
    if (ele.component === 'Input' || ele.component === 'input' || ele.component === 'TextArea') {
        Element = React.createElement(component, props)
    }
    return Element
}
const elementWalk = (layouts, yakaApis) => {
    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!')
    }
    return layouts.map(ele => {
        if (!ele.component || !componentCheck(ele)) return false
        return componentFilter(ele, yakaApis)
    })
}
export default elementWalk