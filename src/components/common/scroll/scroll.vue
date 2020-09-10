<template>
      <div class="wrapper" ref="wrapper">
          <div >
            <slot></slot>
          </div>
      </div>
</template>

<script>
   import BScroll from 'better-scroll'
   // import PullUp from '@better-scroll/pull-up'
   //  BScroll.use(PullUp)
  export default {
    name: "Scroll",
    props: {
       probeType:{
           type: Number,
           default:0
       },
      pullUpLoad:{
         type: Boolean,
         default: false
      }
    },
    data(){
       return {
         scroll:null,
         message: 'hello'
       }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,

        click:true,
        pullUpLoad:this.pullUpLoad,

      })
      // 滚动

        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })

      // 滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
        // console.log(this.scroll);
      }
    },
    methods: {
        scrollTo(x,y,time=300) {
         this.scroll && this.scroll.scrollTo(x,y,time)
        },
       finishPullUp() {
         this.scroll && this.scroll.finishPullUp()
       },
       refresh(){

         this.scroll &&  this.scroll.refresh();
       },
       getScrollY(){
           return this.scroll ? this.scroll.y : 0
       }
    }
  }
</script>

<style scoped>

</style>
