import React from 'react'
import { Icon, Popover, Input, Button } from 'igroot';
const TextArea = Input.TextArea
const json_preview = (Element, { config, key }, { debug, formCreatFunc }) => {
    const _config = JSON.parse(JSON.stringify(config))
    let value = ''
    delete _config.subs
    const styles = {
        icon: {
            position: 'absolute',
            zIndex: 1029,
            right: 16,
            top: -16,
            fontSize: 16,
        },
        overlayStyle: {
            minWidth: 300,
            height: 200
        },
        button: {
            marginTop: 8,
            float: 'right'
        },
        div: {
            overflow: 'hidden'
        }
    }
    let _Element = null
    if (formCreatFunc) {
        _Element = formCreatFunc(Element)
    } else {
        _Element = Element
    }
    const edit = e => {
        e.preventDefault()
        Object.assign(config, value)
        debug()
    }
    const Block = <div key={key}>
        <Popover
            trigger='click'
            overlayStyle={styles.overlayStyle}
            content={
                <div style={styles.div}>
                    <TextArea
                        style={{ width: '100%' }}
                        onChange={e => {
                            try {
                                JSON.parse(e.target.value)
                                value = JSON.parse(e.target.value)
                            } catch (e) {

                            }
                        }}
                        autosize
                        defaultValue={JSON.stringify(_config, null, 2)}
                    />
                    <Button style={styles.button} type='primary' onClick={edit}>修改</Button>
                </div>
            }
        >
            <a><Icon type='tool' style={styles.icon} /></a>
        </Popover>
        {_Element}
    </div>
    return Block
}
export default json_preview
