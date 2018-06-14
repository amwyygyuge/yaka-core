
import React from 'react'
export default function (ele, { components, form }, props) {
    const { name, rules } = ele
    const { Editor } = components
    const { getFieldDecorator } = form
    return getFieldDecorator(`${name}`, {
        rules: rules ? rules : null
    })(
        <Editor {...props} />
    )
}