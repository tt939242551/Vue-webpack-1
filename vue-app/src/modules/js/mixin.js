let mixin = {
  filters:{
    Price(a){
      a = a + ''
      let arr = a.split(".")
      if (!arr[1]) {
        return a.concat(".00")
      } else if (arr[1].length===1) {
        return a.concat("0")
      } else  {
        return a
      }  
    }
  }
}
export default mixin