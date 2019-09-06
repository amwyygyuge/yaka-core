## 安装

```
npm install yaka-core --save

```

## npm

```js
import Yaka from "yaka-core"
const YakaForm = Yaka.YakaForm,
  YakaFormOnFlow = Yaka.YakaFormOnFlow,
  YakaComponent = Yaka.YakaComponent
```

1. YakaForm 这个是针对表单开发的 yaka
2. YakaComponent 这个是组件量级的 yaka
3. YakaFormOnFlow 这个是工单系统用的 yaka

请按需引用

## 使用

```js
import React, { Component } from "react"
import Yaka from "yaka-core"
// yaka组件需另行安装
import yakaComponents from "yaka-components"
const { components, layoutComponents } = yakaComponents
import { config } from "./config/"
const YakaComponent = Yaka.YakaComponent

class App extends Component {
  render() {
    return (
      <div className='yaka'>
        <YakaComponent
          config={config}
          components={components}
          layoutComponents={layoutComponents}
        />
      </div>
    )
  }
}
export default App
```

## api

1. config json 配置，具体配置协议请看文档
2. components yaka 使用组件的引入接口
3. layoutComponents yaka 使用的布局组件的引入接口

## yaka 组件包地址

[地址](https://github.com/amwyygyuge/yaka-components)

## 文档

# 更新日志

## 预览

1. 新的 json 协议
2. mountFunctions 挂载函数接口
3. functionTemplates 函数模板接口
4. mountData 挂载数据接口
5. plugIn 插件接口
6. 模块化配置体验
7. 移除 igroot 依赖，改用 rc-form
8. 抽离 yaka 组件到 yaka-component 包
9. 单元测试
10. 工单的交付测试
11. 新增数据监听
12. 加入生命周期
13. 移除 datamap 功能
14. 移除 models 配置项
15. 移除 functions 配置项
16. 移除 rule 收集功能
17. 移除在 layout 声明全局变量功能

### 新的 json 协议

新的 json 协议会分为以下部分

1. layout 页面结构
2. init yaka 初始化
3. mounted yaka 挂载后
4. name

#### layout

layout 的配置协议做了改动，更加简洁

1. name 现在只有在表单组件需要声明键值的时候才要定义
2. ele 对应原来的 component
3. subs 对应原来的 children
4. text 标签文本内容
5. props 组件的属性

废弃项

1. component
2. children
3. state
4. global
5. initData
6. models
7. functions

以下是新版的配置示例

```json
    "layout": [
        {
            "ele": "Row",
            "subs": [
                {
                    "col": 24,
                    "ele": "h1",
                    "text": "@data",
                    "hide": true,
                    "props": {
                        "style": {
                            "textAlign": "center"
                        }
                    }
                }
            ]
        }
      ]
```

#### init

yaka 初始化的数据声明、函数初始化、数据监听都集中在这里进行处理

1. formValue 原 initData，用来配置表单的初始值

2. state 原 global，用来配置全局变量

3. watch 数据监听配置项目

   数据监听配置项目，目前仅支持监听 全局变量，监听后触发的对应动作仅支持调用函数

   ```json
           "watch": {
               // 声明监听的变量
               "title": {
                   // 声明调用的函数
                   "run": "log"
               }
           }
   ```

4) functions 函数的声明,原 models 和 functions 都转到这里进行配置

   函数声明方式改为配置模板函数的方式，yaka 本身有两个函数模板可以使用，用户也可以自己通过外部写入自己的模板然后声明调用。

   ```json
           "functions": {
               "getItem": {
                   // 函数模板名称
                   "type": "yakaFetch",
                   // 函数模板定义，具体参数应由模板开发者给出配置项
                   "definition": {
                       "headers": {
                           "aa": "@data",
                           "state": "$demo",
                           "string": "string"
                       },
                       "type": "restful",
                       "url": "http://xxxx.com/re/localdns",
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
               "titleChange": {
                   "type": "stream",
                   "definition": {
                       "$title": "target.value",
                       "#sename": "target.value"
                   }
               },
               "log": {
                   "type": "log",
                   "definition": {
                       "text": "自定义代码模板"
                   }
               }
           },
   ```

以下是新版初始化的配置示例

```json
    "init": {
        "formValue": {
            "bumen": "2",
            "name": "1000",
            "checkbox": [
                "Pear"
            ],
            "numbeer": "demo",
            "switch": false
        },
        "state": {
            "demo": "ddddddd"
        },
        "functions": {
            "getItem": {
                "type": "yakaFetch",
                "definition": {
                    "headers": {
                        "aa": "@data",
                        "state": "$demo",
                        "string": "string"
                    },
                    "type": "restful",
                    "url": "http://xxx.com/re/localdns",
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
            "titleChange": {
                "type": "stream",
                "definition": {
                    "$title": "target.value",
                    "#sename": "target.value"
                }
            },
            "log": {
                "type": "log",
                "definition": {
                    "text": "自定义代码模板"
                }
            }
        },
        "watch": {
            "title": {
                "run": "log"
            }
        },
        "event": {
            "demo": {
                "onCLick": "#buttonCLick"
            }
        }
    }
```

#### mounted

yaka 组件挂载后的生命周期钩子，适用于调用一些 api 函数

配置方式很简单，在 run 里面用对象键值的形式声明调用的函数名和对应的参数

```json
    "mounted": {
        "run": {
            "demo": {
                "param": 10000
            },
            "getItem": {},
            "log": {
                "param": "dadwa"
            }
        }
    }
```

### mountFunctions 挂载函数接口

外部函数挂载的接口，挂载进去的函数同 json 配置声明的函数一样的效果。

```react
<YakaFormEngine
    mountFunctions={{
        demo: (data, api) => {
            const { getState, formValueSettingFunction, stateValueSettingFunction } = api
            formValueSettingFunction({ sename: "测试数据" })
            stateValueSettingFunction({
                title: {
                    value: "测试数据"
                }
            })
        },
        yakaChange: (val, api) => {
            console.log(val, '外部接口');
        }
    }}
/>
```

挂载函数接收两个参数

1. Data 触发元素传入的值
2. 暴露的 yakaApi 可以用来修改数据,以下是几个常用的 api

   1. formValueSettingFunction 表单数据设置函数
   2. stateValueSettingFunction 全局变量设置函数
   3. formValueGettingFunction 表单数据获取函数
   4. getState 全局变量获取函数
   5. ​getForm 表单示例获取函数

### functionTemplates 函数模板接口

单纯使用挂载函数的话，很多场景下都要不断开发函数去应对，这样不利于后期维护和整个生态的发展。沿用了旧版的思路，提出函数模板的概念。

用户可以定义一种可以满足部分场景的函数模板，模板可以根据配置应对不同的细微调整。下面是简单的配置示例

```react
<YakaFormEngine
    functionTemplates={{
        log: (definition, data, api) => {
            const { text } = definition
            const log = () => {
                console.log(e);
            }
            return log
        }
    }}
/>
```

参数说明

1. definition 配置字段，可以根据不同函数模板，由用户自己定义
2. data 触发元素传入的值
3. 暴露的 yakaApi 可以用来修改数据,以下是几个常用的 api

下面是在 json 定义和调用的示例

```json
    "init": {
        "functions": {
            "log": {
                "type": "log",
                "definition": {
                    "text": "自定义代码模板"
                }
            }
        }，
        "watch": {
            "title": {
                "run": "log"
            }
        }
    }
```

### mountData 挂载数据接口

外部数据挂载的数据现在用 mountData 统一接收

```react
<YakaFormEngine

    mountData={{ data: this.state.test, num: 1 }}

/>
```

内部接受的用法

```jso
    "layout": [
        {
            "ele": "Row",
            "subs": [
                {
                    "col": 24,
                    "ele": "h1",
                    // 使用 @接受mountData
                    "text": "@data",
                    "hide": true,
                    "props": {
                        "style": {
                            "textAlign": "center"
                        }
                    }
                }
            ]
        },
      ]
```

### plugIn 插件接口

新增插件扩展的接口，现在主要是用来扩展 layout 里面的配置项目

例如我们要在组件配置项目里面加入一个 hide 的字段，如果这个字段为 ture，就不渲染这个组件

插件代码

```react
const logic = (Element, { config, key }, { debug, formCreatFunc, yakaApis }) => {
    if (config.hide) {
 		return null
    }
    return Element
}
export default logic

```

yaka 组件使用方式，插件接口需要传入的是一个数组，用户可以根据需要引入不同的插件扩展

```react
<YakaFormEngine
    plugIn={[logic]}
/>
```

json 配置上的变化

```json
    "layout": [
        {
            "ele": "Row",
            "subs": [
                {
                    "col": 24,
                    "ele": "h1",
                    // 使用 @接受mountData
                    "text": "@data",
                    "hide": true,
                    "props": {
                        "style": {
                            "textAlign": "center"
                        }
                    }
                }
            ]
        },
      ]
```

插件函数的三个入参

1. Element， react 元素，可以在这边进行包装处理
2. 组件配置项， config 为对应的 json，key 为引擎分配给该组件的 key 值
3. 可能用到的 api，debug 为 debug 函数，formCreatFunc 为 表单受控函数，yakaApis 为 yakAPI

注意插件函数必须要有 return 一个元素!!!!

### 模块化配置体验

yaka 配置平台现在按组件细粒度拆分出个个组件的配置，方便用户进行配置微调。

![image-20180614204347094](/var/folders/l4/vjw6mxw16x1cjvsmgk_l2_400000gn/T/abnerworks.Typora/image-20180614204347094.png)

### 移除 igroot 依赖，改用 rc-form

现在 yaka 仅仅是基于 react 和 rc-form 的一个渲染引擎了。

###抽离 yaka 组件到 yaka-component 包

旧版本 yaka 开发的组件都集成在了 yaka-core 里面，现在这部分组件抽离出去，成了一个 npm 包进行引用

```js
yarn add yaka-component
```

## 目录结构

```
├── README.md
├── demo.json
├── dist  构建完的代码
│   ├── engines
│   │   ├── YakaComponent
│   │   │   └── index.js
│   │   ├── YakaForm
│   │   │   └── index.js
│   │   ├── YakaFormOnFlow
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── model
│   │   │   ├── function_templates
│   │   │   │   ├── index.js
│   │   │   │   ├── stream.js
│   │   │   │   └── yakaFetch.js
│   │   │   ├── index.js
│   │   │   ├── layout.js
│   │   │   ├── registerFunctions.js
│   │   │   ├── registerMountFunctions.js
│   │   │   └── unuse
│   │   │       ├── dataMap.js
│   │   │       ├── rules.js
│   │   │       └── state.js
│   │   └── yaka.class.js
│   ├── extend
│   │   ├── editTable.js
│   │   ├── editor.js
│   │   └── index.js
│   ├── index.js
│   ├── plugIn
│   │   ├── index.js
│   │   ├── json_preview.js
│   │   ├── logic.js
│   │   └── quick_setup.js
│   └── tool
│       └── index.js
├── jest.config.js
├── lib 源码
│   ├── engines  yaka组件
│   │   ├── YakaComponent
│   │   │   └── index.jsx
│   │   ├── YakaForm
│   │   │   └── index.jsx
│   │   ├── YakaFormOnFlow
│   │   │   └── index.jsx
│   │   ├── index.js
│   │   ├── model  model方法
│   │   │   ├── function_templates  解析函数模板方法
│   │   │   │   ├── index.js
│   │   │   │   ├── stream.js
│   │   │   │   └── yakaFetch.js
│   │   │   ├── index.js
│   │   │   ├── layout.js   结构解方法
│   │   │   ├── registerFunctions.js  注册函数方法
│   │   │   ├── registerMountFunctions.js   注册挂在函数方法
│   │   │   └── unuse   丢弃的api
│   │   │       ├── dataMap.js
│   │   │       ├── rules.js
│   │   │       └── state.js
│   │   └── yaka.class.jsx
│   ├── extend   组件特殊处理
│   │   ├── editTable.jsx
│   │   ├── editor.jsx
│   │   └── index.js
│   ├── index.js 入口文件
│   ├── plugIn   插件
│   │   ├── index.js
│   │   ├── json_preview.js
│   │   ├── logic.js
│   │   └── quick_setup.js
│   └── tool
│       └── index.js
├── package-lock.json
├── package.json
├── test    单元测试目录
│   ├── __snapshots__
│   ├── demos
│   │   ├── datamap.js
│   │   ├── index.js
│   │   ├── layout.js
│   │   └── logic.js
│   ├── error_case
│   ├── flow.test.js
│   ├── jest
│   │   └── css-transform.js
│   ├── retun.test.js
│   ├── setup.js
│   ├── tool
│   │   └── index.js
│   ├── tool.test.js
│   └── yaka.test.js
├── yarn-error.log
└── yarn.lock
```

## 技术栈

js + react + igroot

## 发布方式

yarn publish
