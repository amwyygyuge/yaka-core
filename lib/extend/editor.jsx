
import React from 'react'
import { Form } from 'igroot';
export default function (ele, { elementWalk, componentCheck, initData, components, form, bindingProps, yakaApis }) {
    const { name, value, rules } = ele
    const { Editor } = components
    const FormItem = Form.Item
    const { getFieldDecorator } = form
    const props = bindingProps(ele, yakaApis)
    return <FormItem key={name}>
        {
            getFieldDecorator(`${name}`, {
                initialValue: value ? value : null,
                rules: rules ? rules : null
            })(
                <Editor {...props} />
            )
        }
    </FormItem>
}