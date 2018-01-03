import React, { Component } from 'react'
import { Select } from 'igroot'

const Option = Select.Option

export class YakaSelect extends Component {
    handleFilterOption = (input, option) => {
      const { searchKeys, options } = this.props
      const inputText = input.toLowerCase()
      const optionValue = option.props.value.toLowerCase()
      const optionChildren = option.props.children.toLowerCase()
      let  isMatch = optionValue.indexOf(inputText) >= 0 || optionChildren.indexOf(inputText) >= 0

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
        const props = this.props
        const children = []

        if ('options' in props) {
            if (Array.isArray(props.options)) {
                props.options.forEach(option => {
                    children.push(<Option key={`${option.value}`} value={`${option.value}`}>{option.label}</Option>)
                })
            }
        }

        return <Select
            showSearch
            allowClear
            filterOption={this.handleFilterOption}
            {...props}
            style={{ width: '100%' }}
        >
            {children}
        </Select>
    }
}
