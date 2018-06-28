<!--
 * 反馈意见页
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎19
-->
<template>
    <div class="container">
        <div class="zan-panel">
            <form @submit="addFeedback" report-submit="true">
                <div class="zan-cell zan-form__item">
                    <text class="zan-form__title">联系方式：</text>
                    <input
                            class="zan-form__input zan-cell__bd"
                            type="number"
                            name = "contact"
                            maxlength="11"
                            placeholder="请输入联系方式"
                    />
                </div>
                <div class="zan-cell zan-form-item" style="align-items: flex-start">
                    <text class="zan-form__titme">建议内容：</text>
                    <textarea class="zan-form__input zan-cell__bd" type="textarea" name="content" maxlength="200" placeholder="请输入建议"></textarea>
                </div>
                <div class="zan-btns">
                    <button class="zan-btn zan-btn--primary" formType="submit">立即提交</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import common from "../../../static/common/common"
    import Bmob from "../../../static/bmob/Bmob-1.4.4.min"
    import {share}  from '@/utils/share'

    export default {
        onShareAppMessage(){
            return share();
        },
        methods:{
            addFeedback(event){
                var contact = event.target.value.contact;
                var content = event.target.value.content;

                if(!contact){
                    common.showTip("联系方式不为空","loading");
                    return false;
                }
                if(!content){
                    common.showTip("内容不能为空","loading");
                    return false;
                }
                if(!(/^1[34578]\d{9}$/.test(contact))){
                    common.showTip("手机号码有误","loading");
                    return false;
                }

                var objectId = wx.getStorageSync('userData').objectId;
                var pointer = Bmob.Pointer("_User");
                var query = Bmob.Query("feedback");
                var poiID = pointer.set(objectId);
                query.set("user", poiID);
                query.set("contact",contact);
                query.set("content",content);
                query.save().then(res => {
                    common.showModal('保存反馈成功，点击确定返回。', '提示', '' ,function () {
                        wx.navigateBack();
                    });
                }).then(err=>{
                    console.log(err);
                });
            }
        }
    }

</script>

<style>
    page{
        background: #eee;
    }
    .container{
        background:#F9F9F9;
        overflow:hidden;
        box-sizing:border-box;
    }
    .zan-panel{
        background:#fff;
        border-top:1px solid #e5e5e5;
        border-bottom:1px solid #e5e5e5;
        overflow:hidden;
    }
    .zan-cell {
        position: relative;
        padding: 12px 15px;
        display: flex;
        align-items: center;
        line-height: 1.4;
        font-size: 14px;
    }

    .zan-cell::after {
        position: absolute;
        left: 15px;
        right: 0;
        bottom: 0;
        border-top: 1rpx solid #e5e5e5;
        background: #e5e5e5;
        content: ' ';
    }
    .zan-cell__bd {
        flex: 1;
    }
    .zan-cell__ft {
        position: relative;
        text-align: right;
        color: #666;
    }

    .zan-cell--last-child::after,
    .zan-cell:last-child::after {
        display: none;
    }

    .zan-cell--access .zan-cell__ft {
        padding-right: 13px;
    }

    .zan-cell--access .zan-cell__ft::after {
        position: absolute;
        top: 50%;
        right: 2px;
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8c8;
        border-style: solid;
        transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    }
    .zan-cell--switch {
        padding-top: 6px;
        padding-bottom: 6px;
    }
    .zan-btns{
        margin: 15px;
    }
    .zan-btn{
        position:relative;
        color:#333;
        background-color:#fff;
        margin-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        border-radius:2px;
        font-size:16px;
        line-height:45px;
        height:45px;
        box-sizing:border-box;
        text-decoration:none;
        text-align:center;
        vertical-align:middle;

    }
    .zan-btn--primary {
        color: #fff;
        background-color: #4b0;
        border-color: #0a0;
    }


</style>