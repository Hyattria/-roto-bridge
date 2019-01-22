/**
 * @export
 * @class Plugin
 */
export default class Plugin {
  constructor (options = {}) {
    this.options = options
    this.ua = window.navigator.userAgent.toLowerCase()
    this.TOKENNAME = 'TOCTOKEN'
    this.CITYNAME = 'TOCCITY'
  }

  /**
   * @param {*} [options={}]
   * @returns
   * @memberof Plugin
   */
  setOptions (options = {}) {
    this.options = Object.assign({}, this.options, options)
    return this
  }

  /**
   * 判断是否是IOS
   * @return {Boolean}
   */
  isIOS () {
    return /iphone|ipad|ipod|ios/.test(this.ua)
  }

  /**
   * 判断是否是安卓
   * @return {Boolean}
   */
  isAndroid () {
    return /android/i.test(this.ua)
  }

  /**
   * 判断是否是微信
   * @return {Boolean}
   */
  isWechat () {
    return /micromessenger/.test(this.ua)
  }

  /**
   * 判断是否在支付宝环境
   */
  isAliPay () {
    return navigator.userAgent.indexOf('AlipayClient') > -1
  }

  /**
   * 判断是否是食行APP
   * @return {Boolean}
   */
  isApp () {
    return /shihang_app/.test(this.ua) || this.options.from === 'app'
  }

  getUserAgent () {
    const isPad = navigator.userAgent.toLowerCase().match(/iPad/i) === 'ipad'
    const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    const isAnd = /android/i.test(navigator.userAgent) || /shihang/i.test(navigator.userAgent)
    const isWx = /micromessenger/.test(navigator.userAgent.toLowerCase())
    const isMiniProgram = /miniProgram/i.test(navigator.userAgent)
    return isWx ? 1500 : isMiniProgram ? 1510 : isPad ? 1400 : isIos ? 1200 : isAnd ? 1300 : 1600
  }
}
