import React, { Component } from 'react'
import { Radio as IgrootRadio } from 'igroot'
const RadioGroup = IgrootRadio.Group

export class Radio extends Component {
    first = false
    componentWillReceiveProps(nextProps) {
        const { value, onChange } = nextProps
        if (!this.first && value !== '' && onChange) {
            this.first = true
            onChange({ target: { value } })
        }
    }

    render() {
        const { options, vertical } = this.props
        const className = vertical === true ? 'vertical' : null
        return (
            <RadioGroup {...this.props} className={className} />
        )
    }
}
