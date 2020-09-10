<template>
     <div class="recommend">
         <div v-for="item in recommends"  :key="item.id" class="recommenditem">
           <a :href="item.link">
             <img :src="item.image" alt="">
             <div>{{item.title}}</div>
           </a>
         </div>
     </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
       recommends:{
           type:Array,
           default(){
             return []
           }
       }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 13px;
    margin-top: 4px;
    padding: 3px;
    border-bottom: 3px solid #EEEDEF;
  }
  .recommenditem {
    flex: 1;
  }
  .recommenditem img {

    width: 80%;
     height: 80%;
  }
</style>
