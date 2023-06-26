// 封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue"
import { useUserStore } from "./user";
import { delCartAPI, insertCartAPI, findNewCartListAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList (购物车列表),空数组
    const cartList = ref([])

    // 2. 定义action - addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的购物车逻辑
            await insertCartAPI({ skuId, count })
            // const res = await findNewCartListAPI()
            // cartList.value = res.result
            updateNewList()
        } else {

            //添加购物车操作
            //已添加过 - count+1
            //未添加过 - 直接push
            //思路：通过匹配传递过来的商品对象中的skuID能不能在cartList中找到
            //      如果找到了，那就是添加过的
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                //找到了
                item.count++
            } else {
                //没找到
                cartList.value.push(goods)
            }
        }
    }

    //删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            //调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId]);
            // const res = await findNewCartListAPI()
            // cartList.value = res.result
            updateNewList()
        } else {
            // 思路：   第1种.  找到删除项的下标值，来匹配splice - splice
            //         第2种.  使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
            // 第一个参数传我们要删除的下标值，第二个参数给个1
        }

    }

    //清除购物车
    const clearCart = () => {
        cartList.value = []
    }


    //获取最新购物车列表action
    //抽象一个获取最新购物车列表action
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        //通过skuId 找到要修改的那一项 然后把它的seLected修改为传过来seLected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        //把cartList 中的每一项的selected都设置为当前的全选框状态
        // 把cartList遍历一下，拿到item选项，取得里头的selected的值
        // 把item.selected设置为selected，进行的赋值操作，之前的===是进行相等比较操作，答案为true或者false
        cartList.value.forEach(item => item.selected = selected)


    }


    //计算属性
    // 1. 总的数量：所有项的count之和     a是每次累加完以后重新交给a，c.count是累加            0是初始值
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2. 总价：所有项的count * price之和                                               单价乘以数量，所以是c.count*c.price
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 3.已选择数量                                                 item.selected 为true
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4.已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


    //是否全选                                   every后面来个匹配,item里的每一项都为true
    const isAll = computed(() => cartList.value.every((item) => item.selected))



    return {
        cartList,
        allCount,
        allPrice,
        selectedCount,
        isAll,
        selectedPrice,

        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart,
        updateNewList

    }
    //


}, {
    persist: true,
})

