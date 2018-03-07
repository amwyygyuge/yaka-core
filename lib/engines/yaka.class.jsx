import React, { Component, Children } from 'react'
import { Button, Form } from 'igroot'
import { streamTo, streamForm, readState, isReadState, streamWalk, streamFilter } from './../tool';
import { functions, models, rules, dataMap, layout } from './model';
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

    // 函数遍历
    functionsWalk = () => {
        Object.assign(
            this.functions,
            functions(this.config.functions, this.yakaApis)
        )
    }

    // 数据模型绑定和运行
    modelWalk = () => {
        Object.assign(
            this.functions,
            models(this.config.models, this.yakaApis)
        )
    }

    // 表单规则遍历
    rulesWalk = (layouts) => {
        Object.assign(this.rules, rules(layouts))
        this.props.getFormData && this.props.getFormData(this.rules)
    }

    dataMapWalk = () => {
        Object.assign(this.state, dataMap(this.dataMap, this.yakaApis))
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
}
