<template>
  <div id="detail">

    <detail-nav-bar class="detail-nav" ></detail-nav-bar>
    <scroll class="content" ref="scroll">
     <detail-swiper :images="topImages"></detail-swiper>
     <detail-base-info :goods="goods"></detail-base-info>
     <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="goodsParam"></detail-param-info>
    </scroll>


  </div>
</template>

<script>
   import DetailNavBar from "./childComps/DetailNavBar";
   import DetailSwiper from "./childComps/DetailSwiper";
   import DetailBaseInfo from "./childComps/DetailBaseInfo";
   import DetailShopInfo from "./childComps/DetailShopInfo";
   import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
   import DetailParamInfo from "./childComps/DetailParamInfo";

   import Scroll from "components/common/scroll/scroll"

   import {getDetail,Goods,Shop,GoodsParam} from "@/network/detail";

   export default {
		name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
    },
    data(){
		  return {
		    iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParam:{},
      }
    },
    created() {

      this.iid= this.$route.params.iid

      this.getDetailData()
    },
    activated() {



    },
     methods:{
		  getDetailData(){
        getDetail(this.iid).then(res => {
             console.log(res);
          const data =res.result;
          this.topImages = res.result.itemInfo.topImages;
          // 获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
           // 获取商家信息
          this.shop = new Shop(data.shopInfo);
           // 保存商品的详情数据
          this.detailInfo = data.detailInfo;
              // 5获取参数
          this.goodsParam = new GoodsParam(data.itemParams.info ,data.itemParams.rule)
        })
      },
       imageLoad() {
		    this.$refs.scroll.refresh()
       }
     }

  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .detail-nav {
    position: relative;
    z-index:9;
    background-color: #fff;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
