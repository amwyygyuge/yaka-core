
import React from 'react'

export default function (ele, that) {
    const { Editor, Form } = that.components
    const FormItem = Form.Item
    const { getFieldDecorator } = that.form
    const props = that.bindingProps(ele)
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