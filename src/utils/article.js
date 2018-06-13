import Bmob from  '../../static/bmob/Bmob-1.4.4.min'

export function getArticle() {
    const query = Bmob.Query("articles");
    query.select("objectId,title,read_counts,excerpt,author,createdAt");
    return query.find().then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}

export function getArticleDetail(id) {
    const query = Bmob.Query('articles');
    return query.get(id).then(res=>{
        return Promise.resolve(res);
    }).catch(err=>{
        console.log(err);
    })
}
export function addReadCount(id) {
    const query = Bmob.Query('articles');
    return query.get(id).then(res=>{
        res.set('read_counts',(parseInt(res.read_counts)+1));
        res.save();
    }).catch(err=>{
        console.log(err);
    })
}