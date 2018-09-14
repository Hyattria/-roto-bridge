import Action from '../utils/Action'
import { UpdateAuth } from '@freshservice/bridge'
import { IsMaxMember } from '../axios'

const cityidMapDev = [
  {
    id: 3,
    flag: 'sz',
    indexId: 1,
    cityName: '苏州市',
    imageSiteUrl: 'http://picpro-sz.34580.com/',
    webApiUrl: 'https://api1.34580.com/'
  },
  {
    id: 1,
    flag: 'sh',
    indexId: 2,
    cityName: '上海市',
    imageSiteUrl: 'http://picpro-sz.34580.com/',
    webApiUrl: 'https://api1.34580.com/'
  },
  {
    id: 5,
    flag: 'wx',
    indexId: 3,
    cityName: '无锡市',
    imageSiteUrl: 'http://picpro-sz.34580.com/',
    webApiUrl: 'https://api1.34580.com/'
  }
]
/**
 * OnInitApp.init().execute().success(function (response)) {
      console.log(4)
    })
 *  执行 update 并且 判断是否是 max 会员, 在 success 中埋点
 *  development 打开 vcondole 调试
 * @export
 * @class OnInitApp
 * @extends {Action}
 */
export default class OnInitApp extends Action {
  constructor (options = {}) {
    super(options)
  }

  static init (options = {}) {
    // super.init().updateAuth()
    return new this(options).updateAuth()
  }

  async request (city, token) {
    const response = await IsMaxMember(city, token)
    return response
  }

  updateAuth () {
    if (process.env.NODE_ENV !== 'production') {
      UpdateAuth.init({cityidMap: cityidMapDev}).execute()
    } else {
      UpdateAuth.init().execute()
    }
    /* eslint-disable */
    if (process.env.NODE_ENV !== 'production') {
      var VConsole = require('vconsole')
      new VConsole()
    }
    return this
  }

  wechat () {
    const token = this.getStorage(this.TOKENNAME)
    const city = this.getStorage(this.CITYNAME)

    this.request(city, token).then(response => {
      if (!response.data.Data) {
        console.log(response.data.Message)
      }
      this.successCallback(response)
    }).catch(e => {
      this.failCallback(e)
    })
  }
}
