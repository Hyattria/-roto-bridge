import Plugin from './Plugin'

export default class Link extends Plugin {
  /**
   * 入口方法
   * @method init
   * @param {Object} options
   */
  static init (options = {}) {
    return new this(options)
  }

  /**
   * 构造函数，私有属性 actionName
   * @param {Object} options
   */
  constructor (options) {
    super(options)
    this.baseNativeUrl = 'https://wechat.34580.com'
    this.nativeUrl = ''
    this.baseWechatUrl = options && options.test ? 'https://wechaty.34580.com/mart/#' : 'https://wechatx.34580.com/mart/#'
    this.wechatUrl = ''
    this.nativeName = ''
  }

  /**
   * 执行主方法
   * @param {Array} params
   */
  execute (...params) {
    this.wechat(...params)
    return this
  }

  /**
   * 新版微信商场内执行的方法
   * @param {*} param
   */
  wechat (...params) {
    if (!this.wechatUrl) {
      throw new Error('跳转链接没有配置!')
    }

    window.location.href = this.baseWechatUrl + this.wechatUrl + (params[0] || '')
  }
}
