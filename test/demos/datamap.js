export default {
    "name": "layout",
    "functions": {
        "typeChange": {
            "streams": {
                "$type.value": "target.value"
            }
        },
        "show": {
            "streams": {
                "$show": true
            }
        },
        "hide": {
            "streams": {
                "$show": false
            }
        }
    },
    "global": {
        "show": false,
        "data1": "数据1",
        "data2": "数据2",
        "data3": "数据3"
    },
    "dataMap": {
        "data": {
            "value": "$type.value",
            "map": [
                {
                    "value": 1,
                    "data": "$data1"
                },
                {
                    "value": 2,
                    "data": "$data2"
                },
                {
                    "value": 3,
                    "data": "$data3"
                }
            ]
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
                        "value": "数据映射表案例"
                    },
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
                    "component": "Radio",
                    "state": {
                        "value": 1
                    },
                    "props": {
                        "onChange": "*typeChange",
                        "options": [
                            {
                                "label": "带宽扩容",
                                "value": 1
                            },
                            {
                                "label": "设备扩容",
                                "value": 2
                            },
                            {
                                "label": "设备扩容",
                                "value": 3
                            }
                        ]
                    }
                },
                {
                    "col": {
                        "span": 24
                    },
                    "name": "card",
                    "component": "Card",
                    "props": {
                        "title": "$data"
                    },
                    "children": [
                        {
                            "name": "de",
                            "component": "h2",
                            "text": "$data"
                        }
                    ]
                }
            ]
        }
    ]
}