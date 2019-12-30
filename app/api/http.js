import {
  config
} from './config.js'

import {
  encrypt
} from '../utils/util.js'


const http = class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    var header
    if (url === 'oauth') {
      console.log('登录接口')
      header = {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + config.defaultToken,
        'Source': 'epc-miniapp'
      }
      var logUrl = `https://testhd.easylines.cn/oauth/token?grant_type=password&username=${data.username}&password=${data.password}`
      data = {}
    } else if (url === 'tob/rest/user/sms') {
      console.log('验证码接口')
      header = {
        'content-type': 'application/json'
      }
      data = encrypt(data)
    } else {
      console.log('其它接口')
      header = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      }
      data = encrypt(data)
    }

    wx.request({
      url: logUrl ? logUrl : config.baseUrl + url,
      method: method,
      header: header,
      data: data,
      success: res => {
        const key = res.data.code
        const code = res.statusCode.toString()
        if (code.startsWith('2') && key === 0) {
          resolve(res.data)
        } else {
          console.log('IO成功但请求失败：', res)
          if (code === '401' || code === '403') {
            this._tokenout()
          } else {
            const err = res.data.message
            this._showErr(err)
          }
          reject(err)
        }
      },
      fail: err => {
        console.log(err)
        reject(err)
        this._showErr(err)
      }
    })
  }

  // 私有方法，用以输出错误信息
  _showErr(err) {
    if (!err) {
      err = '未知错误'
    }
    wx.showToast({
      title: err,
      icon: 'none',
      duration: 2000
    })
  }

  _tokenout () {
    this._showErr('账号过期，请重新登录')
    wx.removeStorageSync('token')
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }, 1000)

    // reject(new Error('tokenOut'))
  }
}

export {
  http as HTTP
}