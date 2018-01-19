import React, { Component, Children } from 'react'
import { Button, Form } from 'igroot'
import { Yaka } from './../yaka.class'
export class YakaForm extends Yaka {
    render() {
        return <div>{this.elementWalk(this.layouts)}
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
        onGetForm && onGetForm(this.form)
    }
}

export default Form.create()(YakaForm)































