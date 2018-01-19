
import React from 'react'
import { Row, Col } from 'igroot'

export default function (ele, that) {
    const props = that.bindingProps(ele)
    if ('style' in props) {
        Object.assign({ marginTop: 15 }, props.style)
    } else {
        props.style = { marginTop: 15 }
    }
    return <Row {...props} >
        {
            ele.children.map((col, index) => <Col span={col.col && col.col || 0} key={`${ele.name}-${index}`}>
                {that.elementWalk([col])}
            </Col>)
        }
    </Row>
}
