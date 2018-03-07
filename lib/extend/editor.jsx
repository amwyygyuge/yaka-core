
import React from 'react'
import { Form } from 'igroot';
export default function (ele, { elementWalk, componentCheck, initData, components, form, bindingProps, yakaApis }) {
    const { Editor } = components
    const FormItem = Form.Item
    const { getFieldDecorator } = form
    const props = bindingProps(ele, yakaApis)
    return <FormItem key={ele.name}>
        {
            getFieldDecorator(`${ele.name}`, {
                initialValue: ele.value ? ele.value : null,
                rules: ele.rules ? ele.rules : null
            })(
                <Editor {...props} />
            )
        }
    </FormItem>
}