<script setup>
import GoodsItem from "../Home/components/GoodsItem.vue";

import { useBanner } from "./composables/useBanner";
import { useCategory } from "./composables/useCategory";
// const {} =xxx(),意思是解构这个对象
const { BannerList } = useBanner();
const { categoryData } = useCategory();
//目标：路由参数变化的时候 可以把分类数据接口重新发送
// onBeforeRouteUpdate((to) => {
//   //参数to，的意思是，目标路由对象
//   // console.log("路由变化了");
//   //存在问题：使用最新的路由参数请求最新的分类数据
//   getCategory(to.params.id);
// });

//获取banner
// const BannerList = ref([]);
// const getBanner = async () => {
//   const res = await getBannerAPI({
//     distributionSite: "2",
//   });
//   BannerList.value = res.result;
// };

// onMounted(() => getBanner());

// import { findTopCategoryAPI } from "@/apis/category";
// const categoryData = ref({});
// const route = useRoute();
// const getCategory = async (id) => {
//   // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
//   const res = await findTopCategoryAPI(id);
//   categoryData.value = res.result;
// };
// getCategory(route.params.id);
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 轮播图 -->
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
        <div class="sub-list">
          <h3>全部分类</h3>
          <ul>
            <li v-for="i in categoryData.children" :key="i.id">
              <RouterLink :to="`/category/sub/${i.id}`">
                <img :src="i.picture" />
                <p>{{ i.name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div
          class="ref-goods"
          v-for="item in categoryData.children"
          :key="item.id"
        >
          <div class="head">
            <h3>- {{ item.name }}-</h3>
          </div>
          <div class="body">
            <GoodsItem
              v-for="good in item.goods"
              :goods="good"
              :key="good.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

//轮播图
.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>