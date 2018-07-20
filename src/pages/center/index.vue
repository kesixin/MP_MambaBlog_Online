<!--
 * 个人中心页
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎13
-->

<template>
    <div class="blog">
        <div class="pages">
            <div class="page__hd i-header">
                <div class="g-bda-userinfo">
                    <div class="g-bda-userinfo-30">
                        <image class="userinfo-avatar" :src="userData.userPic"></image>
                    </div>
                    <div v-if="userData.nickName" class="g-bda-userinfo-70">
                        <span class="userinfo-nickname">{{ userData.nickName }}</span><br>
                        <span v-if="signNum" class="userinfo-sign">已签到{{signNum}}天</span>
                        <span v-else></span>
                    </div>
                    <div v-else class="g-bda-userinfo-70">
                        <text class="userinfo-nickname">尚未解锁</text>
                        <text class="userinfo-sign">请点击下方的按钮解锁</text>
                    </div>
                </div>
            </div>
            <div class="zan-panel" style="border-top:0px;border-bottom:0px;"></div>

            <loading :hidden="authorize">
                授权中...
            </loading>
            <loading :hidden="signShow">
                签到中...
            </loading>
            <loading :hidden="loading">
                获取数据中...
            </loading>
            <div style="height:10px;background: #eee;"></div>
            <div v-if="userData.nickName" class="zan-panel">
                <a href="../new/main" class="zan-cell zan-cell--access">
                    <div><image src="/static/assets/my.png" style="width: 20px;height: 20px;margin-right: 8px;"/></div>
                    <div class="zan-cell__bd">
                        我的消息
                    </div>
                    <div class="badge-wonderfully" style="margin-left: 5px;" v-if="noReadNewsCount"></div>

                </a>
                <a href="../collect/main" class="zan-cell zan-cell--access" style="border-top: 0.5px solid #eee;">
                    <div><image src="/static/assets/notice.png" style="width: 20px;height: 20px;margin-right: 8px;"/></div>
                    <div class="zan-cell__bd">
                        我的收藏
                    </div>
                </a>
            </div>
            <div v-if="userData.nickName" class="contain">
                <div class="zan-panel" style="border-top:0px;border-bottom:0px;width: 100%">
                    <div class="zan-cell zan-cell--access">
                        <div class="zan-cell__bd">
                            <image src="/static/assets/sign.png"></image>
                            <span>签到</span>
                        </div>
                    </div>
                    <div class="item-wrapper">
                        <div v-if="sign" class="unlock_v">
                            <div class='unlock-btn-cicle'>
                                <i class="weui-icon-success weui-icon_msg"></i>
                            </div>
                            <text class="open-word">今日签到时间：{{signTime.createdAt}}</text>
                        </div>
                        <div v-else class="unlock_v">
                            <div class="unlock-btn-cicle">
                                <button class="circle-btn-sign" type="default" @click="_sign">签到</button>
                            </div>
                            <div class="open-word">点击按钮签到</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="contain">
                <div class="zan-panel zan-panel-lock">
                    <div class="zan-cell zan-cell--access">
                        <div class="zan-cell__bd">
                            <image src="/static/assets/lock.png"></image>
                            <span>解锁</span>
                        </div>

                    </div>
                    <div class="item-wrapper">
                        <div class="unlock_v">
                            <div class="unlock-btn-cicle">
                                <button class="circle-btn" open-type="getUserInfo" type="primary"
                                        @getuserinfo="bindGetUserInfo">
                                    解锁
                                </button>
                            </div>
                            <div class="open-word">点击解锁按钮解锁更多功能</div>
                        </div>
                    </div>
                </div>
                <div class="zan-panel zan-panel-bottom"></div>
            </div>
            <div class="contain">
                <div class="zan-panel zan-panel-lock">
                    <div class="zan-cell zan-cell--access">
                        <div class="zan-cell__bd">
                            <image src="/static/assets/other.png"></image>
                            <span>其他</span>
                            <div></div>
                        </div>
                    </div>
                    <div class="zan-cell zan-cell--access zan-other">
                        <button plain="true"
                                style="border: 0;margin: 0;padding: 0;font-size: 18px;color:#000000;line-height: 1;width: 100%;text-align: left;"
                                open-type="share">分享给好友
                        </button>
                    </div>
                    <div class="zan-cell-bottom"></div>
                    <div class="zan-cell zan-cell--access zan-other" style="padding-top: 10px;" @click="feedback">
                        <span>反馈意见</span>
                    </div>
                    <div class="zan-cell-bottom"></div>
                    <div class="zan-cell zan-cell--access zan-other" style="padding-top: 10px;" @click="about">
                        <span>关于本程序</span>
                    </div>
                    <div class="zan-cell-bottom"></div>
                </div>
                <div class="zan-panel zan-panel-bottom"></div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import Bmob from "../../../static/bmob/Bmob-1.4.4.min"
    import common from "../../../static/common/common"
    import {share}  from '@/utils/share'
    import {getNewsCount}  from '@/utils/new'
    export default{
        onLoad(){
            console.log("5555")
        },
        //分享小程序
        onShareAppMessage(){
            return share();
        },
        data(){
            return {
                authorize: true,
                loading: false,
                userData: [],
                sign: false,
                signShow: true,
                signTime: [],
                signNum: "",
                noReadNewsCount:0,
            }
        },
        mounted(){
            this._getUserData();
            this._getNewsCount();
        },
        methods: {
            //授权获取用户信息
            bindGetUserInfo(e){
                var that = this;

                wx.login({
                    success: () => {

                        let current = Bmob.User.current();
                        console.log(current);
//                        if (current.nickName != undefined) {
//
//                        } else {
                            wx.getUserInfo({
                                success: (result) => {
                                    that.authorize = false;
                                    console.log(result);
                                    var objectId = current.objectId;
                                    var userInfo = result.userInfo;
                                    var nickName = userInfo.nickName;
                                    var avatarUrl = userInfo.avatarUrl;

                                    var query = Bmob.Query("_User");
                                    //保存用户信息
                                    query.get(objectId).then(res => {
                                        res.set('nickName', nickName);
                                        res.set('userPic', avatarUrl);
                                        res.save();
                                        var userData = wx.getStorageSync('userData');
                                        userData['nickName'] = nickName;
                                        userData['userPic'] = avatarUrl;
                                        that.authorize = true;
                                        that.userData = userData;
                                        wx.setStorageSync('userData',userData);
                                    }).catch(err => {
                                        console.log(err)
                                    })



                                }
                            })
//                        }
                    }
                })
            },
            //获取用户信息
            _getUserData(){
                var that = this;
                that.loading = false;
                var userData = wx.getStorageSync('userData');
                if (userData == "") {
                    Bmob.User.auth().then(res => {
                        console.log(res);
                        wx.setStorageSync('userData', res);
                        that.userData = res;
                    }).catch(err => {
                    });
                } else {
                    that.userData = userData;
                }

                var query = Bmob.Query("sign");
                query.equalTo("user", "==", this.userData.objectId);
                query.order("-createdAt");
                query.find().then(res => {
                    if (res[0] != "" && res[0] != undefined) {
                        var day = new Date(res[0].createdAt).toDateString();
                        that.signNum = res.length;
                        if (day == new Date().toDateString()) {

                            that.sign = true;
                            that.signTime = res[0];
                        }
                        that.loading = true;

                    } else {
                        that.loading = true;
                    }
                })

            },
            //用户签到
            _sign(){
                var that = this;
                that.signShow = false;
                var pointer = Bmob.Pointer("_User");
                var poiID = pointer.set(this.userData.objectId)
                var query = Bmob.Query("sign");
                query.set("user", poiID);
                query.save().then(res => {

                    setTimeout(function () {
                        that.sign = true;
                        that.signShow = true;
                        that.signTime = res;
                    }, 1500)

                }).catch(err => {
                    console.log(err)
                })
            },
            _share(){
                this.onShareAppMessage();
            },
            feedback(){
                wx.navigateTo({
                    url: '../feedback/main'
                })
            },
            about(){
                common.showModal('本程序后端使用Bmob实现，仅供学习使用，请勿使用于商业用途，如有问题，请联系QQ：462369233', '关于', false);
            },
            _getNewsCount(){
                getNewsCount().then((res)=>{
                    console.log(res);
                   this.noReadNewsCount=res;
                });
            }
        }
    }
</script>

<style>
    page {
        background: #eeeeee;
    }

    .blog {
        background: #fff;
    }

    .i-header {
        height: 150px;
        background-color: white;
        text-align: center;
    }

    .g-bda-userinfo {
        display: flex;
    }

    .g-bda-userinfo-30 {
        width: 50%;
        padding-top: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .g-bda-userinfo-70 {
        width: 50%;
        padding-top: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .userinfo-avatar {
        width: 90px;
        height: 90px;
        margin: 10px;
        margin-bottom: 1px;
        border-radius: 50%;
        border: 3px solid #AEEEEE;

    }

    .userinfo-nickname {
        color: #5F9EA0;
        font-weight: bold;
    }

    .userinfo-sign {
        font-size: small;
        margin-top: 10px;
    }

    .sign {
        color: #292929;
        font-size: 12px;
        margin-top: 5px;
    }

    .zan-panel {
        background: #fff;
        margin-top: 10px;
        overflow: hidden;
    }

    .contain {
        background: #eeeeee;
        overflow: hidden;
        box-sizing: border-box;
    }

    .zan-cell {
        position: relative;
        padding: 12px 15px;
        display: flex;
        align-items: center;
        line-height: 1.4;
        font-size: 14px;
    }

    .zan-panel-lock {
        border-top: 0px;
        border-bottom: 0px;
        width: 100%;
    }

    .zan-panel-bottom {
        border-top: 0px;
        border-bottom: 0px;
    }

    .zan-cell__bd {
        flex: 1;
    }

    .zan-cell__ft{
        position:relative;
        text-align:right;
    }
    .smallsize{
        font-size:12px;
        color:#8a8a8a;
    }

    .item-wrapper {
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #f4f4f4;
    }

    .unlock_v {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .unlock-btn-cicle {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        border: 10px solid #EAEAEA;
    }

    /*修改默认button的颜色*/
    button[type="primary"] {
        font-size: 15px;
        background-color: #ff8247;
    }


    .circle-btn-sign{
        color:white!important;
        font-size:15px;
        width:65px;
        height:65px;
        border-radius:50%;
        background-color:#5fceca!important;
        line-height:65px;
        margin-bottom: 10px;
    }
    /*签到成功图标*/
    .weui-icon_msg {
        font-size: 65px!important;
    }
    .weui-icon-success {
        color: #09BB07;
    }
    [class^="weui-icon-"], [class*=" weui-icon-"] {
        display: inline-block;
        vertical-align: middle;
        font: normal normal normal 14px/1 "weui";
        /* font-size: inherit; */
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    }
    [class^="weui-icon_"]:before, [class*=" weui-icon_"]:before {
        margin: 0;
    }
    .weui-icon-success:before {
        content: "\EA06";
    }
    [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before {
        display: inline-block;
    }
    /*签到成功图标*/
    .signed-icon{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .singed-text{
        margin-top: 10px;
        font-size: small;
    }

    .zan-cell__bd image {
        float: left;
    }

    .open {
        background: none !important;
        color: #000 !important;
    }

    .circle-btn {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background-color: #AEEEEE;
        line-height: 65px;
    }

    .open::after {
        border: none;
    }

    .open-img {
        width: 50px;
        height: 50px;
    }

    .open-word {
        font-size: small;
        margin: 9px 0;
    }

    .zan-cell__bd image {
        width: 18px;
        height: 17px;
    }

    .zan-cell__bd span {
        font-size: 14px;
        margin-left: 8px;
    }

    .zan-cell__bd div {
        width: 110%;
        height: 1px;
        background: #ececec;
        margin-top: 10px;
    }

    .zan-other {
        font-size: 19px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .zan-other div {
        width: 110%;
        height: 1px;
        background: #ececec;
        margin-top: 10px;
    }

    .zan-other span {
        font-size: 18px;
    }

    .zan-cell-bottom {
        margin-left: 15px;
        width: 100%;
        height: 1px;
        background: #ececec;
        margin-top: 10px;
    }
    .badge-wonderfully {
        display:inline-block;
        padding:0.3em;
        border-radius:50%;
        background-color:#E64340;
        color:#FFFFFF;
        line-height:1.2;
        text-align:center;
        vertical-align:middle;

    }

</style>
