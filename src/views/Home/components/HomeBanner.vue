<script setup>
import { getBannerAPI } from "@/apis/home";
import { ref, onMounted } from "vue";

const BannerList = ref([]);
const getBanner = async () => {
  const res = await getBannerAPI();
  // console.log(res);
  BannerList.value = res.result;
};
onMounted(() => getBanner());
</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in BannerList" :key="item.id">
        <img
          src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>