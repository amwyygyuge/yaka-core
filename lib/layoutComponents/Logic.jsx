import React from 'react'
export default function (ele, that) {
    const { value, components } = that.bindingProps(ele)
    console.log(value, 'value', that.form.getFieldValue())
    if (Array.isArray(components)) {
        return <div>
            {components.map(component => {
                if (Array.isArray(value)) {
                    if (value.some(val => val === component.value)) {
                        return that.elementWalk(Array.isArray(component.component) ? component.component : [component.component])
                    } else {
                        return null
                    }
                } else {
                    if (value === component.value) {
                        return that.elementWalk(Array.isArray(component.component) ? component.component : [component.component])
                    } else {
                        return null
                    }
                }
            })}
        </div>
    } else {
        return <div>
            {components.value === value ? that.elementWalk(Array.isArray(components.component) ? components.component : [components.component]) : null}
        </div>
    }

}
