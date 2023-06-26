import { useIntersectionObserver } from "@vueuse/core";
//定义懒加载插件
export const lazyPlugin = {
    install(app) {
        //install(app)的install是固定的
        //懒加载指令逻辑
        app.directive('img-lazy', {
            mounted(el, binding) {
                //el:指令绑定的那个元素 img
                //bingding：指令对象，binding.value,指令等于号后面绑定的表达式的值     图片url
                //         
                console.log(el, binding.value)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        console.log(isIntersecting)
                        if (isIntersecting) {
                            //进入视口区域
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }

}