
import React from 'react'

export default function (ele, that) {
    const { form, initData } = that
    const { EditTable } = that.components
    const { columns, value, scrollWidth, add, remove, exportExcel } = ele.props
    const props = {
        that,
        columns,
        value: initData[ele.name] ? initData[ele.name] : value ? value : null,
        ele,
        form,
        key: ele.name,
        scrollWidth,
        add,
        remove,
        exportExcel
    }
    return <EditTable  {...props} />
}
