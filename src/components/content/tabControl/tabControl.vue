<template>
     <div class="tab-control">
        <div v-for="(item,index) in titles"
             :key="item.id"
             class="tab-control-item"
             @click="tabItemClick(index)"    >
            <span :class="{active:index === currentIndex}">{{item}}</span>
        </div>
     </div>
</template>

<script>
  export default {
    name: "tabControl",
    props: {
      titles :{
        types:Array,
        default(){
           return []
        }
      }
    },
    data() {
      return {
        currentIndex:0
      }
    },
    methods:{
      tabItemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
   .tab-control{
     display: flex;
     text-align: center;
     font-size: 12px;
     background-color: #fff;
     line-height: 40px;
     z-index: 9;
   }

  .tab-control-item {
    flex: 1;


  }
   .tab-control-item span{
        padding: 4px;
   }
   /*.tab-control-item span:hover{*/
   /*  border-bottom: 2px solid #4FB59D;*/
   /*  color: pink;*/
   /*}*/
   .active {
     border-bottom: 2px solid var(--color-tint);
     color: var(--color-high-text);
   }

</style>
