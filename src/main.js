// 引入scss
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'

// import { useIntersectionObserver } from "@vueuse/core";
//测试接口函数
// import { getCategory } from "@/apis/testAPI"
// getCategory().then(res => {
//     console.log(res)
// })

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)





//插件就使用use
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(lazyPlugin)

app.use(componentPlugin)

app.mount('#app')


//定义全局指令
// 使 v-focus 在所有组件中都可用
// app.directive('img-lazy', {
//     mounted(el, binding) {
//         //el:指令绑定的那个元素 img
//         //bingding：指令对象，binding.value,指令等于号后面绑定的表达式的值     图片url
//         //         
//         console.log(el, binding.value)
//         useIntersectionObserver(
//             el,
//             ([{ isIntersecting }]) => {
//                 console.log(isIntersecting)
//                 if (isIntersecting) {
//                     //进入视口区域
//                     el.src = binding.value
//                 }
//             }
//         )
//     }
// })