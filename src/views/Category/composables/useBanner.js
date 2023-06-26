//封装banner轮播图相关的业务代码
import { ref, onMounted } from 'vue'
import { getBannerAPI } from "@/apis/home";

export function useBanner() {
    const BannerList = ref([]);
    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite: "2",
        });
        BannerList.value = res.result;
    };

    onMounted(() => getBanner());
    return {
        BannerList
    }
}
