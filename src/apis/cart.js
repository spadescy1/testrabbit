///member/cart
//封装购物车相关接口
import request from '@/utils/http'
//加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: "POST",
        // 因为是post请求，所以下面一定要有参数，需要加一个data
        data: {
            skuId, count
        }
    })
}

//获取最新的购物粗列表，get请求,没有参数所以不需要data和method
//get请求是可以省略掉method
//而由于get请求是没有数据的，所以是不必加data的
export const findNewCartListAPI = () => {
    return request({
        url: '/member/cart'
    })
}

//删除购物车
export const delCartAPI = (ids) => {
    return request({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

//合并购物车

export const mergeCartAPI = (data) => {
    return request({
        url: '/member/cart/merger',
        method: 'POST',
        data
    })
}









