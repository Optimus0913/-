//引入核心库
import React from 'react'
//引入DOM库
import ReactDom from 'react-dom'
//全局引入rem.js文件
import './assets/js/remScale.js'
//引入全局css文件
import './assets/css/reset.css'

import App from './App'

//引入路由模式
import { BrowserRouter } from 'react-router-dom'

//把组件当做标签渲染
ReactDom.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter >, document.getElementById('root')
)
