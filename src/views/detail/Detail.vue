<template>
  <div id="detail">

    <detail-nav-bar class="detail-nav" @titleclick="titleClick" ref="navref"></detail-nav-bar>
    <scroll class="content"
            @scroll="contentScroll"
            :probe-type="3" ref="scroll">

     <detail-swiper :images="topImages"></detail-swiper>
     <detail-base-info :goods="goods"></detail-base-info>
     <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="goodsParam" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
       <goods-list :goods="recommends" ref="recom"></goods-list>
    </scroll>
     <detail-bottom-bar  @addToCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShow" ></back-top>
      <toast :message="message" :show="show" > </toast>
  </div>
</template>

<script>
   import DetailNavBar from "./childComps/DetailNavBar";
   import DetailSwiper from "./childComps/DetailSwiper";
   import DetailBaseInfo from "./childComps/DetailBaseInfo";
   import DetailShopInfo from "./childComps/DetailShopInfo";
   import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
   import DetailParamInfo from "./childComps/DetailParamInfo";
   import DetailCommentInfo from "./childComps/DetailCommentInfo";
   import DetailBottomBar from "./childComps/DetailBottomBar";
   import GoodsList from "../../components/content/detailGoodsList/GoodsList";

   import Scroll from "components/common/scroll/scroll"
   import BackTop from "../../components/content/backTop/BackTop";
   import toast from "../../components/common/toast/toast";

   import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
   import {debounce} from "../../common/utils";

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
       DetailCommentInfo,
       GoodsList,
       DetailBottomBar,
       BackTop,
       toast,
     },
     data() {
       return {
         iid: null,
         topImages: [],
         goods: {},
         shop: {},
         detailInfo: {},
         goodsParam: {},
         commentInfo: {},
         recommends: [],
         themeTopYs: [],
         getThemeTopY: [],
         curindex: 0,
         isShow:false,
         message:'',
         show:false
       }
     },
     created() {
       // 获取iid
       this.iid = this.$route.params.iid
       // 请求详细数据
       this.getDetailData()
       // 请求推荐数据
       getRecommend().then(res => {

         this.recommends = res.data.list


       })


     },
     mounted() {


       // 监听图片加载
       // this.$bus.$on('itemImageLoad', ()=> {
       //   console.log('----');
       //   this.$refs.scroll.refresh()
       // })
       const refresh = debounce(this.$refs.scroll.refresh, 500)
       this.$bus.$on('itemImageLoad', () => {

         refresh()
       })

     },
     updated() {

       // this.$nextTick( () => {
       //     this.themeTopYs = []
       //     this.themeTopYs.push(0)
       //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
       //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
       //     this.themeTopYs.push(this.$refs.recom.$el.offsetTop)
       //     console.log(this.themeTopYs);
       // })


     },
     activated() {


     },
     methods: {

       // 请求详细数据
       getDetailData() {
         getDetail(this.iid).then(res => {

           const data = res.result;
           this.topImages = res.result.itemInfo.topImages;
           // 获取商品信息
           this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
           // 获取商家信息
           this.shop = new Shop(data.shopInfo);
           // 保存商品的详情数据
           this.detailInfo = data.detailInfo;
           // 5获取参数
           this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
           // 6获取评论信息
           if (data.rate.cRate !== 0) {
             this.commentInfo = data.rate.list[0]
           }
         })

       },
       imageLoad() {
         // 图片加载刷新
         this.$refs.scroll.refresh()

         // 获取各个组件的offsettopp
         this.themeTopYs = []
         this.themeTopYs.push(0)
         this.themeTopYs.push(this.$refs.param.$el.offsetTop)
         this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
         this.themeTopYs.push(this.$refs.recom.$el.offsetTop)
         // console.log(this.themeTopYs);
       },
       titleClick(index) {
         console.log(index);
         this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
       },
       contentScroll(position) {
         const positionY = -position.y
         let length = this.themeTopYs.length
         for(let i =0 ;i < length ; ++i ){
          if(this.curindex !== i && ((i< length -1 && positionY >=
            this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
            ||(i ===  length -1 && positionY >= this.themeTopYs[i])))){
             this.curindex = i ;
            console.log(this.curindex);
            this.$refs.navref.currentIndex = this. curindex
          }
         }

         // 1.判断backtop是否显示
         this.isShow = position.y < -1000
       },
       backClick(){
         this.$refs.scroll.scrollTo(0,0,200)
       },
       addToCart(){
         // 获取购物车需要展示的信息
         const product = {}
         product.image=this.topImages[0];
         product.title= this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.newPrice;
         product.realprice = this.goods.nowPrice;
         product.iid = this.iid;
         console.log("添加了");
         // this.$store.commit('addCart',product)
          this.$store.dispatch('addCart',product).then( res =>{
            console.log(this.$toast);
             this.$toast.show(res,2000)

          })

       },


       // ContentScroll(position){
       //   // 2.决定tabcontrol是否吸顶
       //   this.isTabFixed = position.y< -this.tabOffsetTop
       // },

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
    width: 100%;
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
