
import React from 'react'

export default function (item, { yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps }, props) {
    const { EditTable } = components
    const { name } = item
    const { columns, value, scrollWidth, add, remove, exportExcel, key } = props
    const _props = {
        columns,
        value: initData[name] ? initData[name] : value ? value : null,
        ele: item,
        key: `${key}.${name}`,
        scrollWidth,
        add,
        remove,
        exportExcel,
        yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps, name
    }
    return <EditTable  {..._props} />
}
