/**
 * 用户信息查询等操作
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎27
 */


import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

var userData = wx.getStorageSync('userData');

/**
 * 推送消息通知
 * @param action
 * @param content
 * @param user
 * @param id
 * @returns {Promise.<T>}
 */
export function sendNew(action,content,user,id) {
    const query = Bmob.Query('news');
    var pointer1 = Bmob.Pointer("_User");
    if(action == 'own'){
        var poiID1 = pointer1.set('772352c876');
    }else{
        var poiID1 = pointer1.set(user);
    }
    var pointer2 = Bmob.Pointer("articles");
    var poiID2 = pointer2.set(id);
    query.set("user",poiID1);
    query.set("content",content);
    query.set("article",poiID2);
    query.set("status",'false');
    return query.save().then(res =>{
        return Promise.resolve(true);
    }).catch(err =>{
        return Promise.resolve(false);
    })
}

/**
 * 查询我的消息列表
 * @returns {Promise.<T>}
 */
export function getNewsList() {
    const query = Bmob.Query('news');
    query.equalTo('user','==',userData.objectId);
    query.equalTo('status',"==",'false');
    query.order('-createdAt');
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}

/**
 * 修改信息的阅读状态
 * @param id
 * @returns {Promise.<T>}
 */
export function changeStatus(id) {
    const query = Bmob.Query('news');
    query.set('id',id) //需要修改的objectId
    query.set('status', 'true')
    return query.save().then(res => {
        return Promise.resolve(res);
    }).catch(err => {
        console.log(err)
    })
}

/**
 * 查询未读信息
 * @returns {Promise.<T>}
 */
export function getNewsCount() {
    const query = Bmob.Query('news');
    query.equalTo('status','==','false');
    query.equalTo('user','==',userData.objectId);
    return query.count().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}