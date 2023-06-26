import { ref, onUnmounted, computed } from 'vue'
import dayjs from 'dayjs'


// 封装倒计时逻辑函数
export const useCountDown = () => {
    //4.给底下的定时器一个可变量的名字
    let timer = null
    //1.响应式的数据
    const time = ref(0)
    //3.格式化时间 为 xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    //调一下格式化formatTime
    //2.开启倒计时的函数
    const start = (currentTime) => {
        //开始倒计时的逻辑
        //核心逻辑的编写：每隔1s就减一
        time.value = currentTime
        timer = setInterval(() => { time.value-- }, 1000)
        //start一执行，就会调用这个函数的简写逻辑,还需要把currentTime传过来
    }

    //组件销毁时清除定时器
    //如果timer还存在就把他销毁
    onUnmounted(() => { timer && clearInterval(timer) })
    return {
        formatTime, start
    }
}
