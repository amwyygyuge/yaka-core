import React, { Component, Children } from 'react'
import { Button, Form } from 'igroot'
import { Yaka } from './../yaka.class'
export class YakaForm extends Yaka {
    render() {
        return <div>{this.elementWalk(this.layouts)}
            <div style={{ textAlign: 'center', margin: '15px 0' }}>
                <Button type='primary' onClick={this.onSubmit}>提交</Button>
            </div>
        </div>
    }
    onSubmit = () => {
        const { validateFields } = this.form
        validateFields((err, val) => {
            if (err) {
                console.log(err)
            } else {
                console.log(val)
            }
        })
    }
}

export default Form.create()(YakaForm)































