export function throttle(fn){
  let status = true
  return function(){
    if(!status) return 
    status = false
    setTimeout(function() {
      fn.apply(this,arguments)
      status = true
    }, 1000);
  }
}

export function debence(fn){
  let status = null
  return function (){
    clearTimeout(status)
    status = setTimeout(function(){
      fn.apply(this,arguments)
    },1000)
  }
}