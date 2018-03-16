import React, { Component, Children } from 'react'
import { Form } from 'igroot'
import { Yaka } from './../yaka.class'
let IgrootConfigFormThis
function setStorageItem(key, value) {
    window.localStorage && window.localStorage.setItem(key, value)
}

export class YakaFormOnFlow extends Yaka {
    constructor(props) {
        super(props)
        IgrootConfigFormThis = this
    }

    classDidMount = () => {
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
            setStorageItem('editformNow', JSON.stringify(editNow))
        }
    }
})(YakaFormOnFlow)

