import React, { Component, Children } from 'react'
import { Button, Form } from 'igroot'
import defaultComponents from './../components/';
import defaultLayoutComponents from './../layoutComponents/';
import BsFetch from 'igroot-fetch'
import extend from './../extend/'
export class Yaka extends Component {
    constructor(props) {
        super()
        const { config, components, layoutComponents, form } = props
        this.functions = {}
        this.rules = {}
        this.config = config
        this.layouts = config.layout
        this.dataMap = config.dataMap || {}
        this.components = components ? components : defaultComponents
        this.layoutComponents = layoutComponents ? layoutComponents : defaultLayoutComponents
        this.form = form
        this.initData = config.initData || {}
        this.state = config.global || {}
        this.extend = extend
        // logic state
        this.logicState = {}
    }

    render() {
        return <div>
            {this.elementWalk(this.layouts)}
        </div>
    }

    componentWillMount = () => {
        //函数遍历
        this.functionsWalk()
        //函数绑定

        //state遍历
        this.stateWalk(this.layouts)

        // logicSetState
        this.setState(this.logicState)

        //数据映射遍历
        //规则遍历
        this.rulesWalk(this.layouts)
        //model遍历
        this.modelWalk()
        this.dataMapWalk()

    }

    componentDidMount = () => {
        //载入初始表单数据
        this.initForm()
    }

    componentWillReceiveProps = (nextProps) => {
        const { debug } = this.props
        if (debug && (nextProps.config.length !== this.props.config.length || JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config))) {
            const { config } = nextProps
            this.functions = {}
            this.rules = {}
            this.config = config
            this.layouts = config.layout
            this.initData = config.initData || {}
            Object.assign(this.state, config.global)
            //函数遍历
            this.functionsWalk()
            //函数绑定
            //state遍历
            this.stateWalk(this.layouts)
            //载入初始表单数据
            this.initForm()
            this.dataMapWalk()
        }
    }

    initForm = () => {
        this.form.setFieldsValue(this.initData)
    }

    //函数遍历
    functionsWalk = () => {
        const functions = this.config.functions || {}
        const _functions = {}
        Object.keys(functions).forEach(key => {
            _functions[key] = (e) => {
                this.streamWalk(functions[key].streams, e)
            }
        })
        Object.assign(this.functions, _functions)
    }

    dataMapWalk = () => {
        const dataMap = this.dataMap || {}
        const _dataMap = {}
        Object.keys(dataMap).forEach(key => {
            _dataMap[key] = () => {
                const state = this.state
                let { value, map } = dataMap[key]
                value = this.getState(value, state)
                const m = map.find(m => m.value === value)
                if (m) {
                    const key = m.data
                    if (this.isGetState(key)) {
                        return this.getState(key, state)
                    } else {
                        return key
                    }
                } else {
                    return null
                }
            }
        })
        Object.assign(this.state, _dataMap)
    }

    //数据模型绑定和运行
    modelWalk = () => {
        const models = this.config.models || {}
        const _models = {}
        Object.keys(models).forEach(key => {
            const model = models[key]
            _models[key] = this.modelFactory(model)
            if (model.action === 'auto') {
                _models[key](true)
            }
        })
        Object.assign(this.functions, _models)
    }

    //model函数构建器
    modelFactory = (model) => {
        return (auto = false) => {
            const params = {}
            if (auto !== true && model.params) {
                Object.keys(model.params).forEach(key => {
                    const value = model.params[key]
                    if (this.isGetState(value)) {
                        const val = this.getState(value, this.state)
                        params[key] = val
                        return
                    }
                    if (value.indexOf('#') !== -1) {
                        const val = this.form.getFieldValue(value.slice(1, value.length))
                        params[key] = val
                        return
                    }
                    params[key] = value
                })
            }
            BsFetch(model.url).get(params).then(res => {
                this.streamWalk(model.streams, res)
            })
        }
    }

    //数据流遍历
    streamWalk = (streams, data) => {
        const streamTo = []
        const state = {}
        Object.keys(streams).forEach(key => {
            const val = this.streamFilter(streams[key], data)
            if (key.indexOf('#') !== -1) {
                //表单数据流
                if (key.slice(1, key.length).split('.').length === 1) {
                    const stream = this.streamTo(key.slice(1, key.length).split('.'), {}, val)
                    this.form.setFieldsValue(stream)
                } else {
                    const formKey = key.slice(1, key.length).split('.')
                    const formValues = this.form.getFieldValue(formKey[0])
                    formValues[formKey[1]] = val
                    const obj = {}
                    obj[formKey[0]] = formValues
                    this.form.setFieldsValue(obj)
                }
            }
            //state数据流
            if (this.isGetState(key)) {
                const stream = this.streamTo(key.slice(1, key.length).split('.'), {}, val)
                Object.assign(state, stream)
            }
        })
        this.setState(state)
    }

    //数据流入过滤
    streamFilter = (streamIn, data) => {
        let val = null
        switch (typeof streamIn) {
            //数据别名
            case 'object':
                val = this.streamForm(streamIn.path.split('.'), {}, data)
                Object.keys(streamIn.alias).forEach(aliasKey => {
                    const alias = streamIn.alias[aliasKey]
                    val.map(item => {
                        item[aliasKey] = item[alias]
                        return item
                    })
                })
                return val;
            //布尔类型
            case 'boolean':
                return streamIn;
            case 'string':
                val = streamIn.indexOf('.') !== -1 ? this.streamForm(streamIn.split('.'), {}, data) : data
                return val;
            default:
                return val;
        }
    }

    //数据流入
    streamTo = (arr, obj, target) => {
        if (arr.length === 0) return obj
        const _obj = {}
        if (target !== undefined) {
            _obj[arr.pop()] = target
        } else {
            _obj[arr.pop()] = obj
        }
        return this.streamTo(arr, _obj)
    }

    //数据流出
    streamForm = (arr, obj, data) => {
        if (arr.length === 0) return obj
        let _obj = {}
        if (data !== undefined) {
            _obj = data[arr.shift()]
        } else {
            if (obj === undefined) {
                return null
            } else {
                _obj = obj[arr.shift()]
            }
        }
        return this.streamForm(arr, _obj)
    }

    //状态遍历
    stateWalk = (layouts) => {
        if (!Array.isArray(layouts)) {
            throw Error('children must be an array!')
        }
        const state = {}
        layouts.forEach(ele => {
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
                Object.assign(state, this.stateWalk(ele.children))
            }

            this.getLogicMapComponent(ele)
        })

        this.setState(state)
    }

    getLogicMapComponent(ele, state) {
        const initData = this.initData
        if (ele.component === 'Logic' && ele.props && ele.props.value) {
            const key = ele.props.value

            if (key.indexOf('$') > -1) {
                const formKey = key.slice(1, key.length).split('.')
                const value = initData[formKey[0]] || ''
                this.logicState[formKey[0]] = {}
                this.logicState[formKey[0]][formKey[1]] = value
            }
        }
    }

    //表单规则遍历
    rulesWalk = (layouts) => {
        if (!Array.isArray(layouts)) {
            throw Error('children must be an array!')
        }
        const rules = {}
        layouts.forEach(ele => {
            if (ele.rules) {
                rules[ele.name] = {
                    component: ele.component,
                    rules: ele.rules
                }
                return
            }
            if (ele.component === 'Form') {
                ele.children.forEach(col => {
                    rules[col.name] = {
                        component: col.component,
                        rules: col.rules
                    }
                })
                return
            }

            if (ele.component === 'EditTable') {
                const tableRules = {}
                ele.props.columns.forEach(col => {
                    tableRules[col.name] = {
                        component: col.component,
                        rules: col.rules
                    }
                })
                rules[ele.name] = tableRules
                return
            }
            if (ele.children) {
                Object.assign(rules, this.rulesWalk(ele.children))
            }
        })
        Object.assign(this.rules, rules)
        this.props.getFormData && this.props.getFormData(this.rules)
    }

    //dom遍历
    elementWalk = (layouts) => {
        if (!Array.isArray(layouts)) {
            throw Error('children must be an array!')
        }
        return layouts.map(ele => {
            if (!ele.component || !this.componentCheck(ele)) return false
            return this.componentFilter(ele)
        })
    }

    //非法组件拦截
    componentCheck = (ele) => {
        const { component } = ele
        const rex = /^[A-Za-z0-9]+$/
        if (!rex.test(component)) {
            return false
        } else {
            return true
        }
    }

    //组件分流
    componentFilter = (ele) => {
        const props = this.bindingProps(ele)
        if (props.show === false) { return null }
        const { components, layoutComponents, extend } = this
        //布局组件
        if (layoutComponents[ele.component]) { return layoutComponents[ele.component](ele, this) }
        //组件扩展
        if (extend[ele.component]) { return extend[ele.component](ele, this) }
        //常规组件
        const children = this.bindingText(ele),
            component = components[ele.component] ? components[ele.component] : ele.component
        if (ele.children) {
            Object.assign(children, this.elementWalk(ele.children))
        }

        let Element = React.createElement(component, props, children)
        if (ele.component === 'Input' || ele.component === 'input' || ele.component === 'TextArea') {
            Element = React.createElement(component, props)
        }
        return Element
    }

    //组件内容绑定
    bindingText = (ele) => {
        const children = []
        if (ele.text) {
            if (this.isGetState(ele.text)) {
                const text = this.getState(ele.text, this.state)
                children.push(text)
            } else {
                children.push(ele.text)
            }
        }
        return children
    }

    //绑定props
    bindingProps = (ele) => {
        const props = { key: ele.name }
        if (ele.props) {
            const _state = Object.assign({}, ele.props)
            const state = this.state
            const functions = this.functions
            Object.keys(ele.props).forEach(key => {
                if (typeof ele.props[key] === 'string') {
                    //重定向到state
                    if (this.isGetState(ele.props[key])) {
                        _state[`${key}`] = this.getState(ele.props[key], state)
                        return false
                    }
                    //绑定函数
                    if (ele.props[key].indexOf('*') !== -1) {
                        const redirect = ele.props[key].slice(1, ele.props[key].length)
                        _state[`${key}`] = functions[redirect]
                        return false
                    }
                }
            })
            Object.assign(props, _state)
        }
        return props
    }

    isGetState = (key) => {
        return key.indexOf('$') !== -1
    }

    getState = (key, state) => {
        const redirect = key.slice(1, key.length).split('.')
        const data = this.streamForm(redirect, {}, state)
        if (typeof data === 'function') {
            return data()
        } else {
            return data
        }
    }
}
