import React, { Component, Children } from 'react'
import { Form } from 'igroot'
import { Yaka } from './../yaka.class'
const rulesWalk = layouts => {
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
            Object.assign(rules, rulesWalk(ele.children))
        }
    })
    return rules
}
let IgrootConfigFormThis
function setStorageItem(key, value) {
    window.localStorage && window.localStorage.setItem(key, value)
}

export class YakaFormOnFlow extends Yaka {
    constructor(props) {
        super(props)
        IgrootConfigFormThis = this
    }

    // 表单规则遍历
    rulesWalk = (layouts = []) => {
        Object.assign(this.rules, rules(layouts))
        this.props.getFormData && this.props.getFormData(this.rules)
    }

    yakaWillMount = () => {
        const { layouts } = this
        this.rulesWalk(layouts)
    }

    yakaDidMount = () => {
        this.setDidComponentConfig()
    }


    submit = (success, fail) => {
        const { validateFields } = this.form
        validateFields((err, val) => {
            if (err) {
                fail && fail(err)
            } else {
                success && success(val)
            }
        })
    }

    setDidComponentConfig = () => {
        const { form, onGetFormData, onGetForm } = this.props
        const { config } = this.props

        onGetFormData && onGetFormData(this.rules)
        onGetForm && onGetForm(this, config)
    }
}
export default Form.create({
    onValuesChange: (props, values) => {
        if (IgrootConfigFormThis.props.edit === true) {
            const editNow = IgrootConfigFormThis.props.form.getFieldsValue()
            Object.assign(editNow, values)
            const _editNow = JSON.stringify(editNow)
            try {
                setStorageItem('editformNow', _editNow)
            } catch (error) {
                console.error(error);
            }
        }
    }
})(YakaFormOnFlow)

