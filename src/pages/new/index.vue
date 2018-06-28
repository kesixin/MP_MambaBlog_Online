<!--
 * 我的信息页
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎27
-->
<template>
    <div class="container">
        <loading :hidden="loading">
            数据加载中...
        </loading>
        <div class="page-body">
            <div class="page__bd">
                <block v-for="(item, index) in newsList" :key="index">
                    <a @click="read(item.article.objectId,item.objectId)">
                        <div class="zan-panel">
                            <div class="collect"><image src="/static/assets/new.png" class="collect-img"></image></div>
                            <div class="zan-panel-media">
                                <div class="zan-c-gray-dark zan-font-12">
                                    <div class="zan-panel-box">系统通知</div>
                                    <div class="zan-panel-box">{{ item.createdAt }}</div>
                                    <div class="zan-font-14" style="padding:10px 0">{{ item.content }}</div>
                                    <div class="zan-c-gray zan-font-12">点击查看</div>
                                </div>
                            </div>
                        </div>
                    </a>
                </block>
                <div class="weui-loadmore weui-loadmore_line" v-if="!newsCount">
                    <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无消息</view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import timeago from 'timeago.js'
    import { getNewsList } from '@/utils/new'
    import { changeStatus } from '@/utils/new'
    import { share }  from '@/utils/share'

    export default {
        onLoad(){
            this.newsCount = false;
        },
        onShareAppMessage(){
            return share();
        },
        data () {
            return {
                newsList:[],
                loading:false,
                newsCount:false,
            }
        },
        mounted () {
            this._getNewList();
        },
        methods: {
            _getNewList(){
                getNewsList().then((res)=>{
                    res.forEach((resEach)=> {
                        resEach.createdAt = timeago().format(resEach.createdAt, 'zh_CN');
                    });
                    this.newsList = res;
                    this.loading = true;
                    if(this.newsList.length){
                        this.newsCount =true;
                    }
                })
            },
            read(articleId,newId){
                changeStatus(newId).then((res)=>{
                    var url = "../detail/main?id="+articleId;
                    wx.redirectTo({url});
                });

            }
        }
    }
</script>

<style>
    page{
        background-color:#f3f3f3;
        height:100%;
        font-size:14px;
        line-height:1.6;
    }
    .container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        justify-content: space-between;
        font-size: 14px;
    }
    .page-body {
        width: 100%;
        flex-grow: 1;
        overflow-x: hidden;
    }
    .page__bd{
        margin-top:10px;
    }
    .zan-panel{
        padding:10px;
        position:relative;
        background:#fff;
        margin-top:10px;
        overflow:hidden;
    }
    .collect{
        font-size:25px;
        color:#41C4FF;
        float:left;
        margin-right:15px;
        width:7%;
        height:100px;
    }
</style>
