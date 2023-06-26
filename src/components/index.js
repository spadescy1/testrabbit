//插件的逻辑代码如下




//通过插件的方式
//把components中的所有组件都进行全局化注册

import ImageView from "./ImageView/index.vue"
import Sku from "./XtxSku/index.vue"
//无{}的import后面的名字也可以 自定义

export const componentPlugin = {
    install(app) {
        //app.component('组件名字',组件配置对象)
        //组件名字可以自己自定义
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', Sku)
    }
}
// install是固定的语法