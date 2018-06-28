/**
 * 获取用户缓存信息
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎15
 */


/**
 * 获取本地缓存用户信息
 */

import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

export function getUserData() {
    var objectId = wx.getStorageSync('objectId');
    var query = Bmob.Query();
}