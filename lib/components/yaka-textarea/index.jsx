import React, { Component } from 'react'
import { Input as IgrootInput } from 'igroot'
const TextArea = IgrootInput.TextArea

export class YakaTextArea extends Component {
  render() {
    const { value } = this.props
    return (
      <TextArea {...this.props} value={value || ''} />
    )
  }
}
