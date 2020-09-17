<template>
    <div class="toast"  v-show="isShow">
        <div >{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "toast",
    props:{
      //   message:{
      //     type:String,
      //     default: 'nihao'
      //   },
      // show:{
      //     type:Boolean,
      //     default: true
      // }
    },
    data() {
      return{
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,time){
        this.isShow = true;
        this.message= message;
        setTimeout(() => {
          this.isShow=false;
          this.message=''
        },time)
       }
    }
  }
</script>

<style scoped>
   .toast {
      position: fixed;
      top:50%;
      left:50%;
     padding: 10px;
     transform: translate(-50%,-50%);
     color: white;
     background-color: rgba(0,0,0,0.5);
   z-index: 15;
   }
</style>
