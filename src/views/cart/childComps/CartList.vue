<template>
  <div class="scrollarea">
  <scroll>
    <div>
      <cart-list-item v-for="item in cartList"
                      :key="item.iid"
                      :item-info="item"></cart-list-item>
    </div>
  </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    }
	}
</script>

<style scoped>
  .scrollarea {

    position: absolute;
    top: 44px;
    bottom: 90px;
    width: 100%;

  }
</style>
