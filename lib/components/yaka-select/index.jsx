import React, { Component } from 'react'
import { Select } from 'igroot'

const Option = Select.Option

export class YakaSelect extends Component {
    handleFilterOption = (input, option) => {
        const { searchKeys, options } = this.props
        const inputText = input.toLowerCase()
        const optionValue = option.props.value.toLowerCase()
        const optionChildren = option.props.children.toLowerCase()
        let isMatch = optionValue.indexOf(inputText) >= 0 || optionChildren.indexOf(inputText) >= 0

        if (searchKeys && searchKeys.length) {
            const optionItem = options.filter(item => {
                return item.value.toLowerCase() === optionValue
            })[0]

            searchKeys.map(key => {
                isMatch = isMatch || (optionItem[key] && optionItem[key].toLowerCase().indexOf(inputText) >= 0)
            })
        }

        return isMatch
    }
    render() {
        let _value = undefined
        const props = this.props
        const { options, value, mode } = props
        _value = value
        const children = []
        if ('options' in props) {
            if (Array.isArray(options)) {
                options.forEach(option => {
                    children.push(<Option key={`${option.value}`} value={`${option.value}`}>{option.label}</Option>)
                })
            }
        }
        if (value === "" && mode === 'multiple') { _value = [] }

        if (typeof _value !== 'object' || _value === null) {
            _value = { key: _value, label: '测试' }
        }
        
        return <Select
            showSearch
            labelInValue
            allowClear
            filterOption={this.handleFilterOption}
            {...props}
            value={_value}
            style={{ width: '100%' }}
        >
            {children}
        </Select>
    }
}
