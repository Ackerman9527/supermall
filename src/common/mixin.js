import {POP, NEW, SELL} from "./const";
import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components:{
       BackTop
  },
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}




export const  BackTopMixin = {
    data() {
      return{
      isShow:false
      }
    },
  methods: {
      backTop() {
          this.$refs.scroll.scrollTo(0,0,300)
      }
  }
}
