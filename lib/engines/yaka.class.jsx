import { PureComponent } from 'react'
import { registerMountFunctions, registerFunctions, layout } from './model';
import extend from './../extend/'
export class Yaka extends PureComponent {
    constructor(props) {
        super(props)
        // yaka props解构
        const { config, components = {}, layoutComponents = {}, form, mountFunctions = {}, functionTemplates = {}, mountData = {}, plugIn = [] } = props
        // config 对象解构
        const { init = {}, mounted = {}, eleGroup = {} } = config
        // init 对象解构
        const { functions = {}, state = {}, watch = {}, formValue = {} } = init
        // 表单对象
        this.form = form
        // 表单规则
        this.rules = {}
        // 配置
        this.config = config
        // 代码片段
        this.eleGroup = eleGroup
        // 插件
        this.plugIn = plugIn
        // 挂载声明周期钩子
        this.mounted = mounted
        // 表单对象
        this.form = form
        // 表单初始值
        this.formValue = formValue
        // state 初始化全局变量
        this.state = state
        this.props = props
        // 数据监听
        this.watch = watch
        this.debug = props.debug !== undefined ? () => props.debug(this.config.layout) : false
        // 引擎api
        this.yakaApis = {
            formValueSettingFunction: val => this.form.setFieldsValue(val),
            stateValueSettingFunction: val => this.setState(val),
            formValueGettingFunction: key => this.form.getFieldValue(key),
            getState: () => this.state,
            getFunction: () => this.mountFunctions,
            getForm: () => this.form,
            getComponent: () => {
                return { components, layoutComponents, extend }
            },
            getInitData: () => this.formValue,
            getMountData: () => this.props.mountData,
            isDevelop: () => this.debug,
            getPlugIn: () => this.plugIn
        }
        // 挂载函数
        this.mountFunctions = this.functionsWalk(functions, functionTemplates, mountFunctions, this.yakaApis)
    }

    render() {
        return this.yakaRender()
    }

    yakaRender = () => {
        const _layout = this.props.config.layout
        return layout(_layout, this.yakaApis, 1)
    }

    componentWillMount = () => {
        this.yakaInit()
    }
    // 监听state变化
    componentWillUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            this.searchWatch(nextState)
        }
    }

    // state比对函数
    searchWatch = nextState => {
        const { watch, state, mountFunctions } = this
        Object.keys(state).forEach(key => {
            if (state[key] !== nextState[key]) {
                if (watch[key]) {
                    const functionName = watch[key].run
                    mountFunctions[functionName] && mountFunctions[functionName](nextState[key])
                }
            }
        })
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

    // 初始化
    yakaInit = () => {
        this.yakaWillMount()
    }
    // 挂载结束后
    yakaMounted = (mounted = {}, mountFunctions) => {
        const { run = {} } = mounted
        Object.keys(run).forEach(key => {
            const _funtion = mountFunctions[key]
            if (_funtion) {
                _funtion(run[key])
            } else {
                console.error(`mounted run ${key} is not a defined!`)
            }
        })
    }

    yakaWillMount = () => { }
    yakaDidMount = () => { }

    reset = (nextProps) => {
        const { config, mountFunctions = {}, functionTemplates = {} } = nextProps
        // config 对象解构
        const { init = {} } = config
        // init 对象解构
        const { functions = {}, state = {}, watch = {}, formValue = {} } = init
        this.watch = watch
        this.config = config
        this.formValue = formValue
        Object.assign(this.state, state)
        setTimeout(() => { this.initForm(formValue) }, 0)
        this.mountFunctions = this.functionsWalk(functions, functionTemplates, mountFunctions, this.yakaApis)
    }

    componentWillReceiveProps = (nextProps) => {
        const { debug } = this
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


    // // 数据map遍历 弃用
    // dataMapWalk = (state = {}) => {
    //     Object.assign(state, dataMap(this.dataMap, this.yakaApis))
    // }

    // // 状态遍历 弃用
    // stateWalk = (layouts = [], initData = {}) => {
    //     this.setState(stateWalk(layouts, initData))
    // }

}
