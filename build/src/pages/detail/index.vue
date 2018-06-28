<!--
 * 文章详情页
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎11
-->
<template>
    <div class="blogdetail">
        <loading :hidden="loading">
            数据加载中...
        </loading>
        <div class="page">
            <div class="blog-detail">
                <div class="blog-detail-contaner">
                    <div class="header">
                        <div class="header-cover no-cover">
                            <div class="caption">
                                <h1 class="titl">{{detail.title}}</h1>
                                <p class="time">发布时间:<span>{{detail.createdAt}}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="article-section">

                        <div class="article markdown-body">
                            <wxParse :content="detail.content"/>
                        </div>
                    </div>
                </div>
                <div class="page-tail">
                    <block v-if="userData">
                        <form @submit="submit" report-submit='true'>
                            <div class="resp-input-cell">
                                <input class="resp-input" v-model="message" type="text" placeholder="说点什么吧..."
                                       @input="bindCommentMessageInput"/>
                            </div>
                            <div class="like-btn">
                                <image v-if="collect" class="like-btn-img" src="../../static/assets/collect.png" @click="_collectAction('noCollect')"></image>
                                <image v-else class="like-btn-img" src="../../static/assets/no-collect.png" @click="_collectAction('collect')"></image>
                            </div>
                            <button class="resp-btn" type="primary" formType="submit">发送</button>
                        </form>
                    </block>
                    <div v-else class="need-login" @click="switchTab">点击此处授权，即可评论文章😆</div>
                </div>
                <div :style="'padding: 20px 10px;display:'+show ">
                    <div class="resp-head">全部评论（{{ comments_count }}）</div>
                    <div class="comment" v-for="(comment, index) in comments" :key="index">
                        <div class="comment-info">
                            <div class="comment-author">
                                <div>
                                    <image class="comment-author-icon" :src="comment.replyer.userPic"></image>
                                </div>
                                <div class="comment-author-info">
                                    <div>{{ comment.replyer.nickName }}</div>
                                    <div style="margin-top: 5px;">{{ comment.createdAt }}</div>
                                </div>
                            </div>

                            <div class="comment-author-position">
                                <div @click="replyComment(comment.replyer.objectId,comment.replyer.nickName,comment.formID,comment.replyer.authData.weapp.openid)">
                                    <image src="../../static/assets/comment.png" style="width: 20px;height: 20px;margin-bottom: 7px;"></image>
                                </div>
                                <div>{{ index + 1 }}楼</div>
                            </div>
                        </div>
                        <div>
                            <div class="h2w h2w-light">
                                <div class="h2w__main">
                                    <div class="zan-c-red" v-if="comment.user">@{{ comment.user.nickName }}</div>
                                    <div class="h2w__p" data-alpha="undefined" data-data="undefined"
                                         data-ename="undefined" data-href="undefined" data-id="undefined"
                                         data-name="undefined" data-src="undefined" data-url="undefined" id="">
                                        {{ comment.content }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getArticleDetail} from '@/utils/article'
    import {addReadCount} from '@/utils/article'
    import {getIsCollect} from '@/utils/collect'
    import {collectAction} from '@/utils/collect'
    import {sendComment} from '@/utils/comment'
    import {getComment} from '@/utils/comment'
    import {sendNew} from '@/utils/new'
    import common from "../../../static/common/common"
    import timeago from 'timeago.js'
    import wxParse from 'mpvue-wxparse'
    import Footer from '@/components/footer'
    import {share}  from '@/utils/share'
    import Bmob from  '../../../static/bmob/Bmob-1.4.4.min'
    export default{
        //页面初次加载
        onLoad () {
            this.loading = false;
            this.detail = "";
            this.show = 'none';
            this.userData = wx.getStorageSync('userData');
            this.collect = false;
        },
        onShareAppMessage(){
            return share();
        },
        onPageScroll() {
            this.show = 'block';
        },
        //全局变量
        data (){
            return {
                detail: [],
                comments: [],
                comments_count: 0,
                show: 'none',
                loading: false,
                userData: null,
                message: null,
                userId:null,
                formID:null,
                openid:null,
                collect:null,
            }
        },
        mounted(){
            this._getDetail(this.$root.$mp.query.id);
            this._addReadCount(this.$root.$mp.query.id);
            this._getComment(this.$root.$mp.query.id);
            this._getIsCollect(this.$root.$mp.query.id);
        },
        methods: {
            //获取文章详情
            _getDetail(id){
                getArticleDetail(id).then((res) => {
                    res.createdAt = timeago().format(res.createdAt, 'zh_CN');
                    this.detail = res;
                    this.loading = true;
                })
            },
            //增加阅读数
            _addReadCount(id){
                addReadCount(id).then((res) => {

                })
            },
            //获取文章评论列表
            _getComment(id){
                getComment(id).then((res) => {
                    res.forEach((resEach) => {
                        resEach.createdAt = timeago().format(resEach.createdAt, 'zh_CN');
                        if(resEach.user === undefined){
                            resEach.user=null;
                        }
                    });
                    this.comments_count = res.length;
                    this.comments = res;
                })
            },
            //查询文章是否收藏
            _getIsCollect(id){
                getIsCollect(id).then((res)=>{
                    if(res==1){
                        this.collect=true;
                    }
                })
            },
            //跳转我的页
            switchTab(){
                wx.switchTab({
                    url: '../center/main'
                })
            },
            //获取评论框内容
            bindCommentMessageInput(e) {
                this.message = e.target.value

            },
            //提交评论/回复
            submit:function(e){
                var form_Id = e.target.formId;
                var articleId = this.$root.$mp.query.id;
                var content = this.message;
                var user = null;
                if(!content){
                    common.showTip("请输入内容", "loading");
                    return false;
                }
                var userId = this.userId;
                //发送评论/回复
                sendComment(articleId, userId, content,form_Id).then((res) => {
                    this.message = '';
                    if (res) {

                        //将评论数据增加到页面
                        var userData = wx.getStorageSync('userData');
                        var replyer = {objectId:userData.objectId,userPic:userData.userPic,nickName:userData.nickName,authData:{weapp:{openid:userData.authData.weapp.openid}}};
                        if(userId){
                            user = {nickName:content.split(" ")[0].slice(1)};
                            content=content.slice(content.indexOf(" "));
                        }
                        let data = [];
                        data.push({
                            replyer:replyer,
                            createdAt:"刚刚",
                            content:content,
                            user:user,
                            formID:form_Id
                        });
                        let comments = this.comments;//得到页面上已经渲染的数据
                        comments.push.apply(comments,data);//将页面上的数据和最新获取到的数据合并
                        common.showTip("评论成功", "success");
                        //发送消息通知
                        this._sendNew('own',userData.nickName+"在《" +this.detail.title+"》中评论，请查看！","",this.$root.$mp.query.id);
                        if(userId){
                            //发送消息通知被评论者
                            this._sendNew('user',userData.nickName+"在《" +this.detail.title+"》中回复了您，请查看！",userId,this.$root.$mp.query.id);
                            var myDate = new Date();
                            //发送模板消息通知
                            let modelData = {
                                "touser":this.openid,//openid
                                "template_id":"DR77s7IodDr0gN6JOcIElkCWazrxxmpNoZLgjIzQEiI",//模板id
                                "page":"/pages/detail/main?id="+this.$root.$mp.query.id,//跳转页面
                                "form_id": this.formID,//表单FormID
                                //模板内容
                                "data":{
                                    "keyword1": {
                                        "value": content
                                    },
                                    "keyword2": {
                                        "value": this.detail.title
                                    },

                                    "keyword3": {
                                        "value": myDate.toLocaleString()
                                    }
                                },
                                //关键字
                                "emphasis_keyword": "keyword2.DATA"
                            }
                            //使用Bmob-SDK发送模板消息
                            Bmob.sendWeAppMessage(modelData).then(function (response) {
                                console.log(response);
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }

                    } else {
                        common.showTip("评论失败", "loading");
                    }
                });
            },
            //获取被评论者信息
            replyComment(userId,nickName,formID,openid){
                this.userId = userId;
                this.message='@'+nickName+" ";
                this.formID = formID;
                this.openid = openid;
                console.log(openid);
            },
            //取消/收藏文章
            _collectAction(action){
                collectAction(this.$root.$mp.query.id,action).then((res)=>{
                    if(action == 'noCollect'){
                        this.collect = false;
                        common.showTip("取消成功", "success");
                    }else{
                        this.collect = true;
                        common.showTip("收藏成功", "success");
                    }
                })
            },
            //发送消息通知
            _sendNew(action,content,user,id){
                sendNew(action,content,user,id).then((res)=>{
                    console.log(res);
                })
            }
        },
        components: {
            wxParse,
            'v-footer': Footer
        }

    }
</script>
<style>
    .wxParse .li-circle {
        display: none;
        width: 0px;
        height: 0px;
    }

    .blogdetail {
        position: relative;
        min-height: 100%;
        margin: 0;
        padding: 0;
    }

    .detail {
        height: 100%;
        overflow: hidden;
    }

    .page {
        padding-bottom: 45px;
        overflow: hidden;
        width: 100%;
    }

    .blog-detail {
        padding: 0;
        background: #eeeeee;
        min-height: 100%;
    }

    .blog-detail-contaner {
        max-width: 1000px;
        margin: 0 auto;
        background: #fff;
    }

    .header {
        position: relative;
        padding-top: 44%;
        background-color: #eee;
        background-size: cover;
        background-position: 50%;
    }

    .header-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .no-cover {
        background: #1f3747;
        background-image: -webkit-linear-gradient(left, #1f3747, #293d31);
    }

    .article-section {
        padding: 0;
    }

    .caption {
        padding: 30px 20px;
    }

    .titl {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
    }

    .time {
        font-size: 15px;
        color: #95a5a6;
    }

    .article {
        padding: 5px 20px 20px 20px;
        font-size: 20px;
        background: #fff;

    }

    .article:before {
        display: table;
        content: "";
    }

    .footer {
        height: 20px;
        line-height: 20px;
        font-size: 85rem;
    }

    image {
        width: 100%;
    }

    .page-tail {
        font-size: 14px;
        left: 0;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 100;
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 0.5px solid #dfdfdf;

    }

    .resp-input-cell {
        width: 84%;
        margin-right: 10px;
    }

    form{
        width: 100%;
    }
    .resp-input {

        height: 30px;
        padding-left: 10px;
        margin: 7.5px 0 7.5px 7.5px;
        border: 1px solid #ccc;
        border-radius: 15px;
        width: 74%;
        float: left;
    }

    .resp-btn {
        height: 30px;
        width: 16%;
        line-height: 30px;
        text-align: center;
        margin-right: 4px;
        color: #4b0;
        font-size: 14px;
        float: left;
        margin-top: 9px;
        margin-left: 8px;

    }
    .like-btn{
        height: 30px;
        width: 10%;
        line-height: 30px;
        text-align: center;
        margin-right: 4px;
        color: #4b0;
        font-size: 14px;
        float: left;
        margin-top: 9px;
        margin-left: 8px;
    }
    .like-btn-img{
        width: 30px;
        height:30px;
    }

    .need-login {
        height: 45px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: #999;
    }

    .resp-head {
        color: #FF6A6A;
        margin: 10px 0 13px 10px;
        font-size: 13px;
    }

    .comment {
        border-radius: 2px;
        margin-bottom: 7.5px;
        padding: 10px 15px;
        position: relative;
        align-items: center;
        background-color: white;
    }

    .comment-info {
        padding: 5px 0 7.5px 0;
        margin-bottom: 9px;
        color: gray;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 1px solid #efefef;

    }

    .comment-author {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
    }

    .comment-author-icon {
        width: 320px;
        height: 240px;
        display: inline-block;
        overflow: hidden;
        vertical-align: text-bottom;
        margin: 0;
        border-radius: 10%;
        max-width: 34px;
        max-height: 34px;
    }

    .comment-author-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
        padding-left: 9px;
    }

    .comment-author-position {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
        padding-left: 5px;
    }
    .h2w-light{
        color:#333;
        background-color:white;
    }
    .h2w__p{
        margin-bottom:15px;
        font-size: 14px;
    }
    .zan-c-red{
        color:#f44;
        font-size: 12px;
        margin-bottom: 10px;
    }
</style>