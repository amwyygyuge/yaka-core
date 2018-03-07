
import React from 'react'
import { Row, Col } from 'igroot'

export default function (ele, { yakaApis, form, bindingProps, componentCheck, elementWalk }) {
    const props = bindingProps(ele, yakaApis)
    if ('style' in props) {
        Object.assign({ marginTop: 15 }, props.style)
    } else {
        props.style = { marginTop: 15 }
    }
    return <Row {...props} >
        {
            ele.children.map((col, index) => <Col span={col.col && col.col || 0} key={`${ele.name}-${index}`}>
                {elementWalk([col], yakaApis)}
            </Col>)
        }
    </Row>
}
