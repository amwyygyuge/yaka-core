import React from 'react'
import { Icon, Popover, Input } from 'igroot';
const TextArea = Input.TextArea
const json_preview = (Element, { config, key }, { debug, formCreatFunc }) => {
    const _config = JSON.parse(JSON.stringify(config))
    delete _config.subs
    const styles = {
        icon: {
            position: 'absolute',
            zIndex: 1029,
            right: -16,
            top: -16,
            fontSize: 16,
        },
        overlayStyle: {
            minWidth: 300,
            height: 200
        }
    }
    let _Element = null
    if (formCreatFunc) {
        _Element = formCreatFunc(Element)
    } else {
        _Element = Element
    }
    const changeConfig = (newConfig, oldConfig) => {
        Object.assign(oldConfig, newConfig)
        debug()
    }
    const Block = <div key={key}>
        <Popover trigger='click'
            title='测试'
            overlayStyle={styles.overlayStyle}
            content={
                <TextArea
                    onPressEnter={e => {
                        e.preventDefault()
                        const config = JSON.parse(e.target.value)
                        changeConfig(config, config)
                    }}
                    autosize
                >
                    {JSON.stringify(_config, null, 2)}
                </TextArea>
            }
        >
            <a><Icon type='tool' style={styles.icon} /></a>
        </Popover>
        {_Element}
    </div>
    return Block
}
export default json_preview
