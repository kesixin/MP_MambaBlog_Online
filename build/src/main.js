import Vue from 'vue'
import App from './App'
import Bmob from '../static/bmob/Bmob-1.4.4.min.js'
Bmob.initialize("49d58f274ccd7d1a9bbf75b011da2798", "0914e7d2e4950d46003874ee1056270e");

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [ 'pages/center/main',  'pages/detail/main', 'pages/index/main',  'pages/blog/main','pages/feedback/main','pages/collect/main','pages/new/main', '^pages/homepage/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#5F9EA0',
            navigationBarTitleText: 'Mamba Blog',
            navigationBarTextStyle: '#fff'
        },
        tabBar: {
            color: '#999',
            selectedColor: '#d22222',
            backgroundColor: '#fff',
            borderStyle: 'black',
            list: [{
                pagePath: 'pages/homepage/main',
                text: '首页',
                iconPath: 'static/assets/index1.png',
                selectedIconPath: 'static/assets/index.png'
            }, {
                pagePath: 'pages/blog/main',
                text: '博文',
                iconPath: 'static/assets/news.png',
                selectedIconPath: 'static/assets/news-active.png'
            },{
                pagePath: 'pages/center/main',
                text: '我的',
                iconPath: 'static/assets/center.png',
                selectedIconPath: 'static/assets/center-active.png'
            }]
        }
    }
}
