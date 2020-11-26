import http from '../axios/axios'


//封装接口
//封装推荐歌单接口

export function getMusicdan(params) {
    return http.get('/personalized', {
        params
    })
}

//封装最新音乐歌单
export function GetNewMusic() {
    return http.get('/personalized/newsong')
}

//封装轮播图
export function GetBanner(params) {
    return http.get('/banner', {
        params
    })
}

//封装排行榜接口

export function GetToplist(params) {
    return http.get('/top/list?id=3778678', {
        params
    })
}

//封装热门搜索关键字
export function GetHotsearch() {
    return http.get('/search/hot')
}

//封装搜索
export function getSearch(params) {
    return http.get('/cloudsearch', {
        params
    })
}
//封装搜索建议
export function GetSearchSuggest(params) {
    return http.get('/search/suggest', {
        params
    })
}

//封装多重匹配
export function GetSearchmu() {
    return http.get('/search/multimatch')
}
//封装歌单详情
export function GetSongDetail(params) {
    return http.get('playlist/detail', {
        params
    })
}