//管理用户数据相关

//表单校验（账户名+密码）
import { loginAPI } from "@/apis/user";
import { ref } from "vue"
import { defineStore } from "pinia"
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
//defineStore('模块名'，回调函数)
export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    //1.定义管理用户数据的state
    const userInfo = ref({})
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        //合并购物车,用了map方法来做了一个映射
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewList()
    }



    //退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 把userInfo.value 变成一个空对象，恢复默认值，就可以达到清除信息的功能
        //执行清除购物车的action
        cartStore.clearCart();

    }

    //3.以对象的格式把state和action return出去
    return {
        userInfo, getUserInfo, clearUserInfo
    }
}, {
    persist: true,
})
