<template>
  <div class="back-top">
    <div>
      <img src="~assets/images/common/top.png" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "BackTop",
    methods: {
		  // backClick() {
      //   this.$emit('backTop');
      //
      // }
    }
	}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 18px;
    bottom: 55px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
