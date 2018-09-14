import Action from '../utils/Action'
import { SetShareOptions } from '@freshservice/bridge'
import wx from 'weixin-js-sdk'
import { wxConfig } from '../axios'

export default class Share extends Action {
  static init (otpions, cb) {
    return new this(otpions, cb)
  }
  constructor (otpions, cb) {
    super()
    this.shareData = otpions
    // this.isForbidden = isForbidden
    this.cb = cb || function () {}
  }

  execute (from) {
    if (this.isWechat()) {
      if (wx.miniProgram) {
        this.setMiniProgramShare()
        console.log('mini share init')
      }
      console.log('wx share init')
      return this.onWxConfig()
    } else if (from === 'app') {
      const data = {
        title: this.shareData.title,
        desc: this.shareData.desc,
        link: this.shareData.link,
        imgUrl: this.shareData.appImage,
        shareCode: this.shareData.shareCode || 10
      }
      console.log('app share init')
      SetShareOptions.init({ from: from })
        .execute(data)
        .success(() => {
          this.cb(1, { type: '微信好友/朋友圈', message: 'app share success' })
        })
      return Promise.resolve()
    } else {
      return Promise.resolve()
    }
  }

  async onWxConfig () {
    const url = window.location.href.split('#')[0]
    const response = await wxConfig(url)
    if (response.data.Error === 0) {
      const wxConfigs = response.data.Data
      wx.config({
        debug: false,
        appId: wxConfigs.AppId,
        timestamp: wxConfigs.Timestamp,
        nonceStr: wxConfigs.Noncestr,
        signature: wxConfigs.Signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'showOptionMenu',
          'hideMenuItems',
          'hideOptionMenu'
        ]
      })
    }
    this.shareData.isForbidden ? this.onWxForbidden() : this.onWxShareInit()
  }

  onWxShareInit () {
    const _self = this
    wx.ready(() => {
      wx.showOptionMenu()
      wx.hideMenuItems({
        menuList: [
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:share:facebook',
          'menuItem:share:QZone',
          'menuItem:share:email',
          'menuItem:openWithSafari',
          'menuItem:openWithQQBrowser',
          'menuItem:readMode',
          'menuItem:originPage',
          'menuItem:copyUrl',
          'menuItem:delete',
          'menuItem:editTag',
          'menuItem:favorite',
          'menuItem:share:brand',
          'menuItem:profile',
          'menuItem:addContact'
        ]
      })
      wx.onMenuShareAppMessage({
        title: _self.shareData.title,
        link: _self.shareData.link,
        desc: _self.shareData.desc,
        imgUrl: _self.shareData.imgUrl,
        success: function () {
          _self.cb(1, { type: '微信好友', message: 'wx share success' })
        },
        cancel: function () {
          _self.cb(0, { type: '微信好友', message: 'wx share cancel' })
        }
      })
      wx.onMenuShareTimeline({
        title: _self.shareData.title,
        link: _self.shareData.link,
        desc: _self.shareData.desc,
        imgUrl: _self.shareData.imgUrl,
        success: function () {
          _self.cb(1, { type: '朋友圈', message: 'wx share success' })
        },
        cancel: function () {
          _self.cb(0, { type: '朋友圈', message: 'wx share cancel' })
        }
      })
    })
  }

  onWxForbidden () {
    // const _self = this
    wx.ready(() => {
      wx.hideOptionMenu()
    })
  }

  miniProgramShareInfo (share) {
    wx.miniProgram.getEnv(res => {
      if (res.miniProgram) {
        wx.miniProgram.postMessage({
          data: { share }
        })
      }
    })
  }

  clearMiniProgramShare () {
    this.miniProgramShareInfo({ title: null }) // 清空分享信息
  }

  setMiniProgramShare () {
    this.miniProgramShareInfo({
      title: this.shareData.title, // 分享title
      imageUrl: this.shareData.bannerImg, // 分享主图
      path: window.location.origin + window.location.pathname + window.location.hash // 分享链接
    })
  }
}
