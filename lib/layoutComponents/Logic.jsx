import React from 'react'
export default function (ele, { yakaApis, bindingProps, componentCheck, elementWalk }) {
    const { value, components } = bindingProps(ele, yakaApis)
    if (Array.isArray(components)) {
        return <div>
            {components.map(component => {
                if (Array.isArray(value)) {
                    if (value.some(val => val === component.value)) {
                        return elementWalk(Array.isArray(component.component) ? component.component : [component.component], yakaApis)
                    } else {
                        return null
                    }
                } else {
                    if (value === component.value) {
                        return elementWalk(Array.isArray(component.component) ? component.component : [component.component], yakaApis)
                    } else {
                        return null
                    }
                }
            })}
        </div>
    } else {
        return <div>
            {components.value === value ? elementWalk(Array.isArray(components.component) ? components.component : [components.component], yakaApis) : null}
        </div>
    }

}
