export default {
    name: 'layout',
    functions: {
        typeChange: {
            streams: {
                "$type.value": "self",
            }
        },
        show: {
            streams: {
                "$show": true,
            }
        },
        hide: {
            streams: {
                "$show": false,
            }
        }
    },
    "global": {
        "show": false
    },
    layout: [
        {
            "name": "row0",
            "component": "Row",
            "children": [
                {
                    "col": {
                        "span": 24
                    },
                    "name": "title",
                    "component": "h1",
                    //组件state会收录到全局state里面
                    "state": {
                        "value": "逻辑组件案例"
                    },
                    //引用顶层state数据 等价于 this.state.title.value
                    "text": "$title.value",
                    "props": {
                        "style": {
                            "textAlign": "center"
                        }
                    }
                },
                {
                    "col": {
                        "span": 12
                    },
                    "name": "type",
                    "label": "扩容类型",
                    "component": "Checkbox",
                    "state": {
                        "value": []
                    },
                    "props": {
                        "onChange": "*typeChange",
                        "options": [
                            {
                                "label": "带宽扩容",
                                "value": "bandwidth"
                            },
                            {
                                "label": "设备扩容",
                                "value": "svr"
                            }
                        ]
                    },
                    "rules": [
                        {
                            "required": true,
                            "message": "请选择扩容类型"
                        }
                    ]
                },
                {
                    "col": {
                        "span": 6
                    },
                    "name": "show",
                    "component": "Button",

                    "props": {
                        "onClick": "*show"
                    },
                    "text": "显示"
                },
                {
                    "col": {
                        "span": 6
                    },
                    "name": "hide",
                    "component": "Button",
                    "props": {
                        "onClick": "*hide"
                    },
                    "text": "隐藏"
                },
                {
                    "col": {
                        "span": 24
                    },
                    name: 'logic',
                    component: 'Logic',
                    props: {
                        components: [
                            {
                                value: 'bandwidth',
                                component: {
                                    name: 'com1',
                                    component: 'p',
                                    text: '组件1'
                                }
                            },
                            {
                                value: 'svr',
                                component: {
                                    name: 'com2',
                                    component: 'p',
                                    text: '组件2'
                                }
                            }
                        ],
                        value: "$type.value"
                    }
                },
                {
                    col: {
                        span: 24
                    },
                    name: 'test',
                    component: 'Logic',
                    props: {
                        components: {
                            value: true,
                            component: {
                                name: 'com12',
                                component: 'p',
                                text: '单个组件。。。。。'
                            }
                        },
                        value: "$show"
                    }
                }
            ]
        },
    ]
}