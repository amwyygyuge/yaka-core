import React, { Component } from 'react'
import { TimePicker, DatePicker } from 'igroot'
import moment from 'moment'

export class YakaDatePicker extends Component {

  state = {
    date: '',
    value: null,
    formatDate: 'YYYY-MM-DD HH:mm:ss'
  }

  componentWillMount() {
    const { formatDate } = this.state
    const { defaultValue, format } = this.props

    this.setState({
      value: defaultValue,
      formatDate: format || formatDate,
      date: defaultValue || moment(defaultValue, format || formatDate)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { value, format } = nextProps
    const { formatDate } = this.state
    const date = value ? moment(`${value}`, format || formatDate) : null

    if ('value' in nextProps) {
      this.setState({
        value,
        format: format || formatDate,
        date
      })
    }
  }

  handleChange = (date, value) => {
    const { onChange } = this.props

    this.setState({
      date,
      value
    })

    onChange && onChange(value)
  }

  render() {
    const { date } = this.state

    return (
      <DatePicker {...this.props} value={date}  onChange={this.handleChange}/>
    )
  }
}
