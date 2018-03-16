
import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'igroot'
export default function (ele, { yakaApis, form, bindingProps, componentCheck, elementWalk }) {
    const FormItem = Form.Item
    const { colWidth, labelCol, wrapperCol, gutter, onSubmit, title } = ele.props
    const rowNum = Math.floor(24 / colWidth)
    const times = Math.ceil(ele.children.length / rowNum)
    const _children = []
    for (let i = 0; i < times; ++i) {
        _children.push(ele.children.slice(i * rowNum, (i + 1) * rowNum))
    }
    const { getFieldDecorator } = form
    const styles = {
        title: {
            fontSize: 18,
            borderBottom: '2px solid #1DA57A',
            padding: '0 15px'
        },
        block: {
            background: '#fff'
        }
    }
    const props = bindingProps(ele, yakaApis)
    return <Row gutter={gutter ? gutter : 0} style={styles.block} key={ele.name}>
        {
            _children.map((row, index) =>
                <Row gutter={gutter ? gutter : 0} key={`${ele.name}${index}`}>
                    {
                        row.map((col, subindex) => {
                            const colProps = bindingProps(col, yakaApis)
                            return <Col
                                span={col.col && col.col || colWidth}
                                key={`${ele.name}${index}${subindex}`}>
                                {
                                    colProps.show === false ? <div></div> : <FormItem
                                        label={col.label}
                                        labelCol={{
                                            span: col.labelCol ? col.labelCol : labelCol
                                        }}
                                        wrapperCol={{
                                            span: col.wrapperCol ? col.wrapperCol : wrapperCol
                                        }}
                                    >
                                        {
                                            col.component && componentCheck(col) ? getFieldDecorator(`${col.name}`, {
                                                initialValue: col.value ? col.value : null,
                                                rules: col.rules ? col.rules : null
                                            })(
                                                elementWalk([col], yakaApis)[0]
                                            ) : <div>非法表单组件</div>
                                        }
                                    </FormItem>
                                }
                            </Col>
                        }
                        )
                    }
                </Row>
            )
        }
    </Row>
}
