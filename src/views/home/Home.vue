<template>
  <div id="home">
    <nav-bar  class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control ref="tabcontrol1"
                 :titles="['流行','新款','精选']"
                 @tabClick="TabClick"
                 class="fixed"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :prope-type="3"
            @scroll="ContentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view  ></feature-view>
      <tab-control ref="tabcontrol2"
                   :titles="['流行','新款','精选']"
                   @tabClick="TabClick"></tab-control>
      <goods-list  :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow">  </back-top>

  </div>
</template>
<script>

  import FeatureView from "./childComps/FeatureView";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import NavBar from '@/components/common/navbar/NavBar';
  import tabControl from "../../components/content/tabControl/tabControl";
  import scroll from "../../components/common/scroll/scroll";
  import BackTop from "../../components/content/backTop/BackTop";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeData} from "../../network/home";
  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components :{
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      tabControl,
      GoodsList,
      scroll,BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShow:false,
        isTabFixed:false,
        tabOffsetTop:582,
        saveY:0

      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY);
       this.$refs.scroll.refresh()
    },
    deactivated() {
       this.saveY = this.$refs.scroll.getScrollY();
      console.log(this.saveY);
    },
    created() {
      this.getMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {

      // 监听图片加载
      // this.$bus.$on('itemImageLoad', ()=> {
      //   console.log('----');
      //   this.$refs.scroll.refresh()
      // })
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',() => {

        refresh()
      })

    },
    methods:{


      TabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;

      },
      ContentScroll(position){
        // 1.判断backtop是否显示
        this.isShow = position.y < -1000
        // 2.决定tabcontrol是否吸顶
        this.isTabFixed = position.y< -this.tabOffsetTop

      },
      backClick(){

        this.$refs.scroll.scrollTo(0,0,300);

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      },

      getMultidata() {
        getHomeMultidata().then( res=> {
          this.banners =res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        let page =this.goods[type].page+1
        getHomeData(type,page).then( res => {

          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
          this.$refs.scroll.finishPullUp()
        })
      }
    }

  }
</script>
<style scoped>
  #home {

    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  .fixed {
    position: relative;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }

</style>
