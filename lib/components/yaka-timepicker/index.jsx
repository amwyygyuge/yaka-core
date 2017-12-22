import React, { Component } from 'react'
import { TimePicker } from 'igroot'
import moment from 'moment'

export class YakaTimePicker extends Component {

  state = {
    time: '',
    value: null,
    formatTime: 'HH:mm:ss'
  }

  componentWillMount() {
    const { formatTime } = this.state
    const { defaultValue, format } = this.props

    this.setState({
      value: defaultValue,
      formatTime: format || formatTime,
      time: defaultValue || moment(defaultValue, format || formatTime)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { value, format } = nextProps
    const { formatTime } = this.state
    const time = value ? moment(`${value}`, format || formatTime) : null    

    if ('value' in nextProps) {
      this.setState({
        value,
        format: format || formatTime,
        time
      })
    }
  }

  handleChange = (time) => {
    const { onChange } = this.props
    const { formatTime } = this.state
    const value = moment(time).format(formatTime)

    this.setState({
      time,
      value
    })

    onChange && onChange(value)
  }

  render() {
    const { time } = this.state

    return (
      <TimePicker {...this.props} value={time}  onChange={this.handleChange}/>
    )
  }
}
