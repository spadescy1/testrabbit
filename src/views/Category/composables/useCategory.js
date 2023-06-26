//封装分类数据业务相关代码
import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
    //获取我们的分类数据
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id);
        categoryData.value = res.result;
    }; //钩子函数，精细化控制
    onMounted(() => getCategory());
    onBeforeRouteUpdate((to) => {
        //参数to，的意思是，目标路由对象
        // console.log("路由变化了");
        //存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id);
    });
    return {
        categoryData
    }
}