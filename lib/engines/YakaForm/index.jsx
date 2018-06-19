import React from 'react'
import { createForm } from 'rc-form';
import { Yaka } from './../yaka.class'
export class YakaForm extends Yaka {
    render() {
        return <div>{this.yakaRender()}
            {this.props.onSubmit ? <div style={{ textAlign: 'center', margin: '15px 0' }}>
                <button type='primary' onClick={this.onSubmit}>提交</button>
            </div> : null}
        </div>
    }
    yakaDidMount = () => {
        this.setDidComponentConfig()
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

export default createForm()(YakaForm)































