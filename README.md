## 安装
```
npm install yaka-core --save

```
## npm
```js
import Yaka from 'yaka-core'
const YakaForm = Yaka.YakaForm,
    YakaFormOnFlow = Yaka.YakaFormOnFlow,
    YakaComponent = Yaka.YakaComponent
```
1. YakaForm 这个是针对表单开发的yaka
2. YakaComponent 这个是组件量级的yaka
3. YakaFormOnFlow 这个是工单系统用的yaka

请按需引用
## 使用
```js
import React, { Component } from 'react';
import Yaka from 'yaka-core'
// yaka组件需另行安装 
import yakaComponents from 'yaka-components'
const { components, layoutComponents } = yakaComponents
import { config } from './config/'
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
export default App;

```

## api
1. config json配置，具体配置协议请看文档
2. components yaka使用组件的引入接口
3. layoutComponents yaka使用的布局组件的引入接口

## yaka组件包地址
[地址](https://github.com/amwyygyuge/yaka-components)
## 文档
[文档](http://jr.baishancloud.com:8090/pages/viewpage.action?pageId=21341051)