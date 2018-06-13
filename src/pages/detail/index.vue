<template>
    <div class="blogdetail">
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
                            <wxParse :content="detail.content" />
                        </div>
                    </div>
                </div>
                <div :style="'display:'+show">
                    <v-footer></v-footer>
                </div>

            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { getArticleDetail } from '@/utils/article'
    import { addReadCount } from '@/utils/article'
    import timeago from 'timeago.js'
    import wxParse from 'mpvue-wxparse'
    import Footer from '@/components/footer'

    export default{
        onLoad () {
            this.detail="";
            this.show = 'none';
        },
        onPageScroll() {
            this.show='block';
        },
        data (){
            return {
                detail:[],
                show:'none'
            }
        },
        mounted(){
            this._getDetail(this.$root.$mp.query.id);
            this._addReadCount(this.$root.$mp.query.id);
        },
        methods:{
            _getDetail(id){
                getArticleDetail(id).then((res)=>{
                    res.createdAt = timeago().format(res.createdAt,'zh_CN');
                    this.detail=res;
                })
            },
            _addReadCount(id){
                addReadCount(id).then((res)=>{

                })
            }
        },
        components:{
            wxParse,
            'v-footer':Footer
        },

    }
</script>
<style>
    .wxParse .li-circle{
        display:none;
        width:0px;
        height:0px;
    }
    .blogdetail{
        position:relative;
        min-height:100%;
        margin:0;
        padding:0;
        background: #dee3e7;
    }
    .detail{
        height:100%;
        overflow:hidden;
    }
    .page{
        padding-bottom:45px;
        overflow:hidden;
        width:100%;
    }
    .blog-detail{
        padding:0;
        background: #dee3e7;
        min-height: 100%;
    }
    .blog-detail-contaner{
        max-width:1000px;
        margin:0 auto;
        background:#fff;
    }
    .header{
        position:relative;
        padding-top:44%;
        background-color:#eee;
        background-size: cover;
        background-position:50%;
    }
    .header-cover{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    .no-cover{
        background: #1f3747;
        background-image: -webkit-linear-gradient(left,#1f3747,#293d31);
    }
    .article-section{
        padding: 0;
    }
    .caption{
        padding: 30px 20px;
    }
    .titl{
        margin-bottom:20px;
        font-size:20px;
        font-weight:700;
        color:#fff;
    }
    .time{
        font-size:15px;
        color:#95a5a6;
    }
    .article{
        padding:5px 20px 20px 20px;
        font-size: 20px;
        background: #fff;

    }
    .article:before{
        display: table;
        content:"";
    }

    .footer{
        height:20px;
        line-height: 20px;
        font-size:85rem;
    }
    image{
        width: 100%;
    }
</style>