export default (fn, time) => {
  let timeout

  return function (...args) {
    const functionCall = () => fn.apply(this, args)
    clearTimeout(timeout)

    return new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(functionCall())
      }, time)
    })
  }
}
