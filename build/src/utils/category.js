/**
 * 文章分类查询
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎21
 */

import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

/**
 * 查询文章分类列表
 * @returns {Promise.<T>}
 */
export function getCategory(){
    const query = Bmob.Query("categories");
    query.order("createdAt");
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}
