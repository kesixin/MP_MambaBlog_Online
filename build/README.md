## 项目简介
项目还在开发阶段，简单版可以查看 https://github.com/kesixin/MP_MambaBlog_Online， 这是一个个人博客小程序版，使用 [Mpvue](https://github.com/Meituan-Dianping/mpvue) 编写而成，服务端使用的是Bmob后端云，无需开发服务端接口即可使用，快速便捷，适合个人使用。后续将继续迭代功能，欢迎提建议和意见。


## 效果图

<p>
  <img src="https://upload-images.jianshu.io/upload_images/6673460-f70ab81c81407115.png" width="40%" />
  <img src="https://upload-images.jianshu.io/upload_images/6673460-9be2408e695d8397.png" width="40%"/>
  <img src="https://upload-images.jianshu.io/upload_images/6673460-90890b3dba614a46.png" width="40%" />
  <img src="https://upload-images.jianshu.io/upload_images/6673460-8803dd1647422fae.png" width="40%" />
</p>


## 小程序二维码

![](https://upload-images.jianshu.io/upload_images/6673460-944c2056d39a1da0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 安装教程

#### 1.克隆源代码

```
git clone git@github.com:kesixin/MP_Mamba_Blog.git
```

#### 2.安装依赖

```
npm install
```

#### 3.修改Bmob SDK,初始化

* 修改`/src/main.js`文件中的

```
import Bmob from '../static/dist/Bmob-1.4.4.min.js'
Bmob.initialize("你的应用Appkey", "你的应用Resetkey");
```

#### 4.编译

```
npm run dev
```

#### 5. 启动微信开发者工具，引入项目。

