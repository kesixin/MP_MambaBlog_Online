/**
 * 我的收藏查询等操作
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎27
 */

import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

var userData = wx.getStorageSync('userData');

/**
 * 查询是否收藏文章
 * @param id
 * @returns {Promise.<T>}
 */
export function getIsCollect(id) {
    var userData = wx.getStorageSync('userData');
    const query = Bmob.Query('collect');
    query.equalTo('article','==',id);
    query.equalTo('user','==',userData.objectId);
    return query.count().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}

/**
 * 取消/收藏文章
 * @param id
 * @param action
 * @returns {*}
 */
export function collectAction(id,action) {
    var userData = wx.getStorageSync('userData');
    const query = Bmob.Query('collect');
    if(action == 'noCollect'){
        query.equalTo('article','==',id);
        query.equalTo('user','==',userData.objectId);
        return query.find().then(todos =>{
            todos.destroyAll().then(res=>{
                return Promise.resolve(res);
            }).catch(err=>{
                return Promise.resolve(false);
            })
        })
    }else{
        var pointer1 = Bmob.Pointer("_User");
        var poiID1 = pointer1.set(userData.objectId);
        var pointer2 = Bmob.Pointer("articles");
        var poiID2 = pointer2.set(id);
        query.set("user",poiID1);
        query.set("article",poiID2);
        return query.save().then(res =>{
            return Promise.resolve(true);
        }).catch(err =>{
            return Promise.resolve(false);
        })
    }
}

/**
 * 查询收藏文章列表
 * @returns {Promise.<T>}
 */
export function getCollectList() {
    var userData = wx.getStorageSync('userData');
    const query = Bmob.Query("collect");
    query.equalTo('user','==',userData.objectId);
    query.include('article','article');
    query.order('-createdAt');
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}
