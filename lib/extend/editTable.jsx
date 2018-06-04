
import React from 'react'

export default function (item, { yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps }) {

    const { EditTable } = components

    const { name, props } = item
    const { columns, value, scrollWidth, add, remove, exportExcel } = props
    const _props = {
        columns,
        value: initData[name] ? initData[name] : value ? value : null,
        ele: item,
        key: name,
        scrollWidth,
        add,
        remove,
        exportExcel,
        yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps
    }
    return <EditTable  {..._props} />
}
