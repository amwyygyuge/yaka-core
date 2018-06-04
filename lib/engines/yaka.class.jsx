import React, { Component, Children } from 'react'
import { registerMountFunctions, registerFunctions, models, dataMap, layout, stateWalk } from './model';
import extend from './../extend/'
export class Yaka extends Component {
    constructor(props) {
        super()
        // yaka props解构
        const { config, components = {}, layoutComponents = {}, form, mountFunctions = {}, functionTemplates = {} } = props
        // config 对象解构
        const { init = {}, layout = [], mounted = {}, eleGroup = {} } = config
        // init 对象解构
        const { functions = {}, state = {}, watch = {}, event = {}, formValue = {} } = init
        // 表单实力
        this.form = form
        // 表单规则
        this.rules = {}
        // 配置
        this.config = config
        // 代码片段
        this.eleGroup = eleGroup
        // 挂载声明周期钩子
        this.mounted = mounted
        // 布局
        this.layout = layout
        // 组件对象
        this.components = components
        this.layoutComponents = layoutComponents
        // 表单对象
        this.form = form
        // 表单初始值
        this.formValue = formValue
        // state 初始化全局变量
        this.state = state
        this.props = props
        // 特殊处理
        this.extend = extend
        // TODO   数据监听
        this.watch = {}
        // TODO 事件代理
        this.event = {}
        this.logicState = {}
        // 引擎api
        this.yakaApis = {
            formValueSettingFunction: (val) => this.form.setFieldsValue(val),
            stateValueSettingFunction: (val) => this.setState(val),
            formValueGettingFunction: (key) => this.form.getFieldValue(key),
            getState: () => this.state,
            getFunction: () => this.mountFunctions,
            getForm: () => this.form,
            getComponent: () => {
                return { components: this.components, layoutComponents: this.layoutComponents, extend: this.extend }
            },
            getInitData: () => this.formValue,
            getProps: () => this.props
        }
        // 挂载函数
        this.mountFunctions = this.functionsWalk(functions, functionTemplates, mountFunctions, this.yakaApis)
    }

    render() {
        return layout(this.layout, this.yakaApis)
    }

    componentWillMount = () => {
        this.yakaInit()
    }

    componentDidMount = () => {
        const { mountFunctions, formValue, mounted } = this
        // 初始化表单数据
        this.initForm(formValue)
        setTimeout(() => { this.initForm(formValue) }, 0)
        // 运行挂载之后的函数
        this.yakaMounted(mounted, mountFunctions)
        this.yakaDidMount()

    }

    yakaDidMount = () => { }

    yakaInit = () => {
        this.yakaWillMount()
    }

    yakaMounted = (mounted = {}, mountFunctions) => {
        const { run = {} } = mounted
        Object.keys(run).forEach(key => {
            const _funtion = mountFunctions[key]
            if (_funtion) {
                _funtion()
            } else {
                console.error(`mounted run ${key} is not a defined!`)
            }
        })
    }

    yakaWillMount = () => { }


    reset = (nextProps) => {
        const { config } = nextProps
        const { models, functions, layouts, initData } = config
        this.config = config
        this.layouts = config.layout
        this.initData = config.initData || {}
        Object.assign(this.state, config.global)
        //函数遍历
        this.functionsWalk(functions)
        //state遍历
        this.stateWalk(layouts, initData)
        //载入初始表单数据
        this.dataMapWalk(this.state)
        setTimeout(() => { this.initForm(initData) }, 0)
    }

    componentWillReceiveProps = (nextProps) => {
        const { debug } = this.props
        if (debug && (nextProps.config.length !== this.props.config.length || JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config))) {
            this.reset(nextProps)
        }
    }

    // 数据载入
    initForm = (initData = {}) => { this.form.setFieldsValue(initData) }

    // 函数遍历
    functionsWalk = (initFunctions, functionTemplates, mountFunctions, yakaApis) => {
        return Object.assign(
            registerMountFunctions(mountFunctions, yakaApis),
            registerFunctions(initFunctions, functionTemplates, yakaApis)
        )
    }

    // 数据模型绑定和运行
    modelWalk = (initModels = {}) => {
        Object.assign(
            this.functions,
            models(initModels, this.yakaApis)
        )
    }

    // 数据map遍历
    dataMapWalk = (state = {}) => {
        Object.assign(state, dataMap(this.dataMap, this.yakaApis))
    }

    // 状态遍历
    stateWalk = (layouts = [], initData = {}) => {
        this.setState(stateWalk(layouts, initData))
    }
}
