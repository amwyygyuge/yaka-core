import React, { Component, Children } from 'react'
import { Button, Form } from 'igroot'
import { functions, models, rules, dataMap, layout } from './../model';
import { Yaka } from './../yaka.class'
export class YakaForm extends Yaka {
    render() {
        return <div>{layout(this.layouts, this.yakaApis)}
            {this.props.onSubmit ? <div style={{ textAlign: 'center', margin: '15px 0' }}>
                <Button type='primary' onClick={this.onSubmit}>提交</Button>
            </div> : null}
        </div>
    }
    componentDidMount = () => {
        //载入初始表单数据
        this.initForm()
        this.setDidComponentConfig()
    }
    initForm = () => {
        this.form.setFieldsValue(this.initData)
    }

    onSubmit = () => {
        const { validateFields } = this.form
        const { onSubmit } = this.props
        validateFields((err, val) => {
            if (err) {
                onSubmit && onSubmit(val)
            } else {
                onSubmit && onSubmit(val)
            }
        })
    }
    setDidComponentConfig = () => {
        const { onGetForm } = this.props
        onGetForm && onGetForm(this.form)
    }
}

export default Form.create()(YakaForm)































