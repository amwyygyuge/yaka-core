import React, { Component } from 'react'
import E from 'wangeditor'
import uuid from 'uuid'
import './index.css'

export class YakaEditor extends Component {
  isFirstInit = true

  componentDidMount() {
    const { id, style } = this.props
    const elem = document.getElementById(id)
    const editor = this.editor = new E(elem)
    this.setState({ id })
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
    const { extraCls, style, id, disabled } = this.props
    const cls = extraCls || ''

    return (
      <div className="yaka-editor-container">
        <div id={id} className={`yaka-editor ${cls}`} style={style} />
        {disabled && <div className="disabled-mask" />}
      </div>
    )
  }
}
