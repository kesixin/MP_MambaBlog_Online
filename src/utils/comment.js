/**
 * 用户评论/回复查询等操作
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎22
 */

import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

/**
 * 发送评论/回复
 * @param articleId
 * @param userId
 * @param content
 * @param form_Id
 * @returns {Promise.<T>}
 */
export function sendComment(articleId,userId,content,form_Id){
    var userData = wx.getStorageSync('userData');
    var replyerId = userData.objectId;
    var query = Bmob.Query("comments");
    var pointer1 = Bmob.Pointer("_User");
    var poiID1 = pointer1.set(replyerId);
    var pointer2 = Bmob.Pointer("articles");
    var poiID2 = pointer2.set(articleId);
    if(userId) {
        var pointer3 = Bmob.Pointer("_User");
        var poiID3 = pointer3.set(userId);
        query.set("user",poiID3)
        content=content.slice(content.indexOf(" "));
    }
    query.set("content",content);
    query.set("replyer",poiID1);
    query.set("article",poiID2);
    query.set("formID",form_Id);
    return query.save().then(res =>{
        return Promise.resolve(true);
    }).catch(err =>{
        return Promise.resolve(false);
    })

}

/**
 * 获取文章评论/回复
 * @param articleId
 * @returns {Promise.<T>}
 */
export function getComment(articleId) {
    var query = Bmob.Query("comments");
    query.include('replyer,user','_User');
    query.equalTo("article","==",articleId);
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}