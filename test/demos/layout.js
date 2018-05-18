export default {
    "name": "home",
    "initData": {
        "bumen": "2",
        "name": "test",
        "checkbox": [
            "Pear"
        ],
        "numbeer": "demo",
        "switch": false,
        "editTable": [
            {
                "serverType": "23131",
                "serverNum": 1,
                "serverTarget": "1",
                "serverUseNode": 1,
                "os": true,
                "other": 1
            },
            {
                "serverType": "23131",
                "serverNum": 1,
                "serverTarget": "1",
                "serverUseNode": 1,
                "os": true,
                "other": 1
            },
            {
                "serverType": "2313wdadwaw1",
                "serverNum": 1,
                "serverTarget": "1",
                "serverUseNode": 1,
                "os": true,
                "other": 1
            },
            {
                "serverType": "2313wwwwwwwwwwwwwww1",
                "serverNum": 1,
                "serverTarget": "1",
                "serverUseNode": 1,
                "os": true,
                "other": 1
            }
        ]
    },
    "global": {
        "demo": "ddddddd"
    },
    "models": {
        "getItem": {
            "action": "auto",
            "headers": {
                "aa": "@test",
                "state": "$demo",
                "string": "string"
            },
            "type": "restful",
            "url": "http://xingyang.com/re/localdns",
            "params": {
                "demo": "$title.value",
                "test": "#name"
            },
            "streams": {
                "$bumen.options": {
                    "path": "data.org",
                    "alias": {
                        "label": "label",
                        "value": "value"
                    }
                },
                "$test.options": "data.org"
            }
        }
    },
    "functions": {
        "titleChange": {
            "streams": {
                "$title.value": "target.value",
                "#sename": "target.value",
                "@yakaChange": "target.value"
            }
        }
    },
    "layout": [
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
                    "state": {
                        "value": "日志系统服务器采购申请"
                    },
                    "text": "@test",
                    "props": {
                        "style": {
                            "textAlign": "center"
                        }
                    }
                }
            ]
        },
        {
            "name": "row1",
            "component": "Row",
            "children": [
                {
                    "col": {
                        "span": 24
                    },
                    "name": "formCard",
                    "component": "Card",
                    "props": {
                        "title": "日志系统服务器采购申请"
                    },
                    "children": [
                        {
                            "name": "form",
                            "component": "Form",
                            "props": {
                                "colWidth": 8,
                                "labelCol": {
                                    "span": 8
                                },
                                "wrapperCol": {
                                    "span": 16
                                },
                                "gutter": 30
                            },
                            "children": [
                                {
                                    "name": "name",
                                    "label": "申请人",
                                    "component": "Input",
                                    "props": {
                                        "onChange": "*titleChange"
                                    },
                                    "rules": [
                                        {
                                            "required": true,
                                            "message": "请填写申请人"
                                        }
                                    ]
                                },
                                {
                                    "name": "sename",
                                    "label": "受控表单",
                                    "component": "Input",
                                    "props": {
                                        "onChange": "@yakaChange"
                                    }
                                },
                                {
                                    "name": "bumen",
                                    "label": "申请需求部门",
                                    "component": "Select",
                                    "props": {
                                        "options": "$bumen.options",
                                        "onChange": "*getItem"
                                    }
                                },
                                {
                                    "name": "date",
                                    "label": "需求交付时间",
                                    "component": "DatePicker"
                                },
                                {
                                    "name": "numbeer",
                                    "label": "数量",
                                    "component": "Input"
                                },
                                {
                                    "name": "radio",
                                    "label": "单选",
                                    "component": "Radio",
                                    "props": {
                                        "options": [
                                            {
                                                "label": "Apple",
                                                "value": "Apple"
                                            },
                                            {
                                                "label": "Pear",
                                                "value": "Pear"
                                            },
                                            {
                                                "label": "Orange",
                                                "value": "Orange",
                                                "disabled": false
                                            }
                                        ]
                                    }
                                },
                                {
                                    "name": "checkbox",
                                    "label": "多选",
                                    "component": "Checkbox",
                                    "props": {
                                        "options": [
                                            {
                                                "label": "Apple",
                                                "value": "Apple"
                                            },
                                            {
                                                "label": "Pear",
                                                "value": "Pear"
                                            },
                                            {
                                                "label": "Orange",
                                                "value": "Orange",
                                                "disabled": false
                                            }
                                        ]
                                    }
                                },
                                {
                                    "name": "time",
                                    "label": "需求具体时间",
                                    "component": "TimePicker"
                                },
                                {
                                    "name": "switch",
                                    "label": "开关",
                                    "component": "Switch"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "row2",
            "component": "Row",
            "children": [
                {
                    "col": {
                        "span": 24
                    },
                    "name": "tableBlock",
                    "component": "Card",
                    "state": {
                        "title": "申请人信息"
                    },
                    "props": {
                        "title": "@tesr",
                        "style": {
                            "padding": 10
                        }
                    },
                    "children": [
                        {
                            "component": "Table",
                            "name": "table",
                            "props": {
                                "dataSource": [
                                    {
                                        "key": "1",
                                        "name": "胡彦斌",
                                        "age": 32,
                                        "address": "西湖区湖底公园1号"
                                    },
                                    {
                                        "key": "2",
                                        "name": "胡彦祖",
                                        "age": 42,
                                        "address": "西湖区湖底公园1号"
                                    }
                                ],
                                "columns": [
                                    {
                                        "title": "姓名",
                                        "dataIndex": "name"
                                    },
                                    {
                                        "title": "年龄",
                                        "dataIndex": "age"
                                    },
                                    {
                                        "title": "住址",
                                        "dataIndex": "address"
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "row6",
            "component": "Row",
            "children": [
                {
                    "col": {
                        "span": 24
                    },
                    "name": "cards",
                    "component": "Card",
                    "props": {
                        "title": "@test"
                    },
                    "children": [
                        {
                            "name": "edit",
                            "component": "Editor",
                            "rules": [
                                {
                                    "required": true,
                                    "message": "请填写申请人"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "row5",
            "component": "Row",
            "children": [
                {
                    "col": {
                        "span": 24
                    },
                    "name": "editTableBlock",
                    "component": "Card",
                    "props": {
                        "title": "申请资源的详细信息",
                        "style": {
                            "padding": 10
                        }
                    },
                    "children": [
                        {
                            "name": "editTable",
                            "component": "EditTable",
                            "props": {
                                "value": [
                                    {
                                        "serverType": "",
                                        "serverNum": 1,
                                        "serverTarget": "1",
                                        "serverUseNode": 1,
                                        "os": true,
                                        "other": 1,
                                        "key": 1
                                    }
                                ],
                                "columns": [
                                    {
                                        "title": "服务器机型",
                                        "component": "Input",
                                        "name": "serverType",
                                        "rules": [
                                            {
                                                "required": true,
                                                "message": "请填写InputNumber"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "服务器数量",
                                        "component": "InputNumber",
                                        "name": "serverNum",
                                        "rules": [
                                            {
                                                "required": true,
                                                "message": "请填写服务器数量"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "服务器用途",
                                        "name": "serverTarget",
                                        "component": "Select",
                                        "props": {
                                            "options": "$bumen.options"
                                        }
                                    },
                                    {
                                        "title": "服务器使用节点",
                                        "component": "Input",
                                        "name": "serverUseNode"
                                    },
                                    {
                                        "title": "操作系统要求",
                                        "component": "Switch",
                                        "name": "os"
                                    },
                                    {
                                        "title": "其他需求",
                                        "component": "Input",
                                        "name": "other"
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
}