
import React from 'react'
export default function (ele, { components, form }, props) {
    const { name, value, rules } = ele
    const { Editor } = components
    const { getFieldDecorator } = form
    return getFieldDecorator(`${name}`, {
        initialValue: value ? value : null,
        rules: rules ? rules : null
    })(
        <Editor {...props} />
    )
}