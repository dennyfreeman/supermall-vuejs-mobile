//工具箱

//防抖函数（默认创建方法）
export function debounce(func, delay=1000) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)

    //当时间到了delay时候，timer才会有值，而且同时会执行func刷新和在此将时间返回
    //之后的话timer就会被上面的判断语句清除timer
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


