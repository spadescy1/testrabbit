//axios的封装
import axios from "axios"
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router"

const httpInstance = axios.create({
    baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeour: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    //1.从pinia获取token数据
    const userStore = useUserStore()
    //2.按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    //   后面是后端要求的接口，固定的，`Bearer ${token}`,把token数据换过来就可以了
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
        //     和下面是等效的
        // config.headers.Authorization =`Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    ElMessage({
        type: "warning",
        message: e.response.data.message
    })
    //401 token失效处理
    //1. 清除本地用户数据
    //2. 跳转到登录页
    if (e.response.state === 401) {
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance