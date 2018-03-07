
import React from 'react'

export default function (ele, { yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps }) {
    const { EditTable } = components
    const { columns, value, scrollWidth, add, remove, exportExcel } = ele.props
    const props = {
        columns,
        value: initData[ele.name] ? initData[ele.name] : value ? value : null,
        ele,
        key: ele.name,
        scrollWidth,
        add,
        remove,
        exportExcel,
        yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps
    }
    return <EditTable  {...props} />
}
