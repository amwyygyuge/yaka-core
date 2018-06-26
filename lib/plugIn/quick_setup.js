import React from 'react'
import { Icon, Popover, Input, Button, Tag } from 'igroot';
const quick_setup = (Element, { config, key, parent }, { debug, yakaApis }) => {
    const styles = {
        overlayStyle: {
            minWidth: 300,
            maxWidth: 500,
            height: 200
        },
        div: {
            textAlign: 'center'
        },
        tag: {
            marginTop: 8
        }
    }
    const { getComponent } = yakaApis
    const tgaClick = val => {
        config.ele = val
        // config.subs = [{}]
        debug()
    }
    const { components, layoutComponents } = getComponent()
    let componentNames = Object.keys(components)
    if (parent === 'formBlock') {
        componentNames = componentNames.filter(item => {
            return item === "Checkbox" || item === "Input" || item === "InputNumber" || item === "TextArea" || item === "Switch" || item === "TimePicker" || item === "Select" || item === "DatePicker" || item === "Radio"
        })
    }
    const eleTags = componentNames.map(com => <Tag key={com} style={styles.tag} onClick={() => tgaClick(com)} color="#2db7f5">{com}</Tag>)
    const Block = <div key={key} style={styles.div}>
        <Popover trigger='click'
            title='添加组件'
            overlayStyle={styles.overlayStyle}
            content={eleTags}
        >
            <Button type='primary'>添加组件</Button>
        </Popover>
    </div>
    return Block
}
export default quick_setup
