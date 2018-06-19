
import React from 'react'

export default function (item, { yakaApis, elementWalk, componentCheck, initData, components, form, bindingProps }, props) {
    const { EditTable } = components
    const { name } = item
    const { columns, value, scrollWidth, add, remove, exportExcel, key } = props
    const _value = initData[name] ? initData[name] : (value ? value : null)
    const _props = {
        columns,
        value: _value,
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
