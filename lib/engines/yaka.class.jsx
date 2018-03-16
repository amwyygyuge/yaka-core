import React, { Component, Children } from 'react'
import { Button, Form } from 'igroot'
import { streamTo, streamForm, readState, isReadState, streamWalk, streamFilter } from './../tool';
import { functions, models, rules, dataMap, layout, stateWalk } from './model';
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
            getInitData: () => this.initData
        }
    }

    render() {
        return <div>
            {layout(this.layouts, this.yakaApis)}
        </div>
    }

    componentWillMount = () => {
        this.init()
    }

    componentDidMount = () => {
        //载入初始表单数据
        this.initForm(this.initData)
        this.classDidMount()

    }

    classDidMount = () => {

    }

    init = () => {
        const { config, layouts, initData, state } = this
        const { models, functions } = config
        //函数遍历
        this.functionsWalk(functions)
        //函数绑定
        //state遍历
        this.stateWalk(layouts, initData)
        //数据映射遍历
        //规则遍历
        this.rulesWalk(layouts)
        //model遍历
        this.modelWalk(models)
        this.dataMapWalk(state)
    }



    reset = (nextProps) => {
        const { config } = nextProps
        const { models, functions, layouts, initData } = config
        this.functions = {}
        this.rules = {}
        this.config = config
        this.layouts = config.layout
        this.initData = config.initData || {}
        Object.assign(this.state, config.global)
        //函数遍历
        this.functionsWalk(functions)
        //函数绑定
        //state遍历
        this.stateWalk(layouts, initData)
        //载入初始表单数据
        this.dataMapWalk(this.state)
        setTimeout(() => {
            this.initForm(initData)
        }, 100)
    }

    componentWillReceiveProps = (nextProps) => {
        const { debug } = this.props
        if (debug && (nextProps.config.length !== this.props.config.length || JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config))) {
            this.reset(nextProps)
        }
    }

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

    // 表单规则遍历
    rulesWalk = (layouts = []) => {
        Object.assign(this.rules, rules(layouts))
        this.props.getFormData && this.props.getFormData(this.rules)
    }

    dataMapWalk = (state = {}) => {
        Object.assign(state, dataMap(this.dataMap, this.yakaApis))
    }

    // 状态遍历
    stateWalk = (layouts = [], initData = {}) => {
        this.setState(stateWalk(layouts, initData))
    }
}
