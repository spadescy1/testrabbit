import request from '@/utils/http'


export const getOrderAPI = (id) => {
    return request({
        //由于是拼接的，所以要改成模板字符串，就不能用以往的方式去写了
        //url:'/member/order/{id}',要改成url: `/member/order/${id}`,
        url: `/member/order/${id}`,
        // method: 'GET',


    })
}