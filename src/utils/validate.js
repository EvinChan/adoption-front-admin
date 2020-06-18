export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

//校验是否为汉字
export function validChinese(str) {
  const reg = /^[\u4E00-\u9FA5]+$/
  return reg.test(str)
}

//校验是否为汉字或字母
export function validChineseAlphabet(str) {
  const reg = /^[\u4E00-\u9FA5a-zA-Z]+$/
  return reg.test(str)
}

// //校验是否为0-99的整数
// export function validNumber(str) {
//   const reg = /^([1-9]\d|\d)$/
//   return reg.test(str)
// }

//校验是否为xxx.x的浮点数
//校验体重
export function validFloat1(str) {
  // const reg = /^(0|[1-9]\d{0,2})(\.\d)?$/
  const reg = /(^\d\.[1-9]$)|(^([1-9]|[1-9]\d)(\.\d)?$)|(^(100)(\.[0])?$)/
  return reg.test(str)
}

//检验手机号
export function validMobile(str) {
  const reg = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
  return reg.test(str)
}

//检验密码
export function validPassword(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  return reg.test(str)
}


