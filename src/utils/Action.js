import Plugin from './Plugin'

export default class Action extends Plugin {
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
    this.actionName = ''
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
   * 微信商城方法
   */
  wechat () {
    return this
  }

  /**
   * success方法
   */
  success (callback) {
    this.successCallback = callback
    return this
  }

  fail (callback) {
    this.failCallback = callback
    return this
  }

  successCallback () {
    return this
  }

  failCallback () {
    return this
  }

  getStorage (storageName) {
    const storageString = window.localStorage.getItem(storageName)
    return storageString ? window.JSON.parse(storageString) : undefined
  }
}
