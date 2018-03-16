import React, { Component } from 'react'
import E from 'wangeditor'
import uuid from 'uuid'
import './index.css'

export class YakaEditor extends Component {
  constructor(props) {
    super()
    this.id = `${props.id}${new Date().getTime()}`
  }
  isFirstInit = true

  componentDidMount() {
    const { style } = this.props
    const elem = document.getElementById(this.id)
    const editor = this.editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      (this.props.onChange || (() => { }))(html)
    }

    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
    if (style && style.height) {
      let height = style.height
      editor.$textElem[0].parentElement.style.height = `${parseInt(height) - 48}px`
    }
    editor.txt.html(this.props.value)

  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.isFirstInit && this.editor && this.editor.txt.html(nextProps.value)
      this.isFirstInit = false
    }
  }

  render() {
    const { extraCls, style, disabled } = this.props
    const cls = extraCls || ''

    return (
      <div className="yaka-editor-container">
        <div id={this.id} className={`yaka-editor ${cls}`} style={style} />
        {disabled && <div className="disabled-mask" />}
      </div>
    )
  }
}
