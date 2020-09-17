export  default  {

    addCart(context,payload){
      // let oldProduct = null;
      // for(let item of state.cartList){
      //    if(item.iid === payload.iid){
      //      oldProduct = item;
      //    }
      // }
      return new Promise((resolve,reject) =>{
      let product = context.state.cartList.find(item => item.iid === payload.iid)

      if(product){
        product.count += 1
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        context.state.cartList.push(payload)
        resolve('添加了新的商品')

      }
    })
    }
}
