/**
 * 文章查询等操作
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎11
 */

import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

/**
 * 获取文章列表
 * @param pageSize
 * @param pagination
 * @param selectType
 * @returns {Promise.<T>}
 */
export function getArticle(pageSize,pagination,selectType) {
    const query = Bmob.Query("articles");
    if(selectType != 0 ){
        query.equalTo("category","==",selectType);
    }
    query.limit(pageSize);
    query.skip(pageSize * pagination);
    query.order("-createdAt");
    query.select("objectId,title,read_counts,excerpt,author,createdAt");
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}

/**
 * 查询文章详情
 * @param id
 * @returns {Promise.<T>}
 */
export function getArticleDetail(id) {
    const query = Bmob.Query('articles');
    return query.get(id).then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}

/**
 * 修改文章阅读数
 * @param id
 * @returns {Promise.<T>}
 */
export function addReadCount(id) {
    const query = Bmob.Query('articles');
    return query.get(id).then(res=>{
        res.set('read_counts',(parseInt(res.read_counts)+1));
        res.save();
    }).catch(err=>{
        console.log(err);
    })
}

/**
 * 通过分类查询文章
 * @param category
 * @returns {Promise.<T>}
 */
export function getArticleByCategory(category) {
    const query = Bmob.Query("articles");
    if(category != 0){
        query.equalTo("category","==",category);
    }
    query.order("-createdAt");
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}