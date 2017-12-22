import React, { Component } from 'react'
import { Switch } from 'igroot'

export class YakaSwitch extends Component {
  constructor(props) {
    super(props)

    const { value } = this.props
    let newValue = value

    if (typeof value === 'string') {
      if (value.toLowerCase() === 'false') newValue = false
      if (value.toLowerCase() === 'true') newValue = true
    }

    this.state = {
      status: !!newValue
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        status: !!nextProps.value
      })
    }
  }

  handleChange = (value) => {
    const { onChange } = this.props

    this.setState({
      status: value
    })

    onChange && onChange(value)
  }

  render() {
    const { status } = this.state
    const note = {
      checkedChildren: '是',
      unCheckedChildren: '否'
    }

    return (
      <Switch {...note} {...this.props} checked={status} onChange={this.handleChange} />
    )
  }
}
