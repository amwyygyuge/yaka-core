import React, { Component, Children } from 'react'
import { functions, models, dataMap, layout, stateWalk } from './model';
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
        this.components = components ? components : {}
        this.layoutComponents = layoutComponents ? layoutComponents : {}
        this.form = form
        this.initData = config.initData || {}
        this.state = config.global || {}
        this.extend = extend
        this.logicState = {}
        this.yakaApis = {
            formValueSettingFunction: (val) => this.form.setFieldsValue(val),
            stateValueSettingFunction: (val) => this.setState(val),
            formValueGettingFunction: (key) => this.form.getFieldValue(key),
            getState: () => this.state,
            getFunction: () => this.functions,
            getForm: () => this.form,
            getComponent: () => {
                return { components: this.components, layoutComponents: this.layoutComponents, extend: this.extend }
            },
            getInitData: () => this.initData,
            getProps: () => this.props
        }
    }

    render() {
        return layout(this.layouts, this.yakaApis)
    }

    componentWillMount = () => {
        this.init()
    }

    componentDidMount = () => {
        //载入初始表单数据
        this.initForm(this.initData)
        setTimeout(() => { this.initForm(this.initData) }, 0)
        this.yakaDidMount()

    }

    yakaDidMount = () => { }

    init = () => {
        const { config, layouts, initData, state } = this
        const { models, functions } = config
        //函数遍历
        this.functionsWalk(functions)
        //函数绑定
        //state遍历
        this.stateWalk(layouts, initData)
        //数据映射遍历
        //model遍历
        this.modelWalk(models)
        this.dataMapWalk(state)
        this.yakaWillMount()
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
    initForm = (initData = {}) => {
        this.form.setFieldsValue(initData)
    }

    // 函数遍历
    functionsWalk = (initFunctions = {}) => {
        Object.assign(
            this.functions,
            functions(initFunctions, this.yakaApis)
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
