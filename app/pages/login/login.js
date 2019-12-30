import {
  LogModel
} from "../../api/models/log"
const logModel = new LogModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultHead: '../../imgs/default_head.png',
    isLegal: false,
    phoneIcon: '../../imgs/phone_icon.png',
    keyIcon: '../../imgs/key_icon.png',
    hadPost: false,
    code: '获取验证码',
    time: 60,
    interval: null,
    phone: '',
    password: '',
    key: '',
    authorized: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var storagePhone = wx.getStorageSync('phone')
    storagePhone && this.setData({
      phone: storagePhone
    })
    this._userAuthorized()
    this._goHome()
  },

  phoneInput (e) {
    this.setData({
      phone: e.detail.value
    })
    this._isEmpty()
  },

  passWdInput (e) {
    this.setData({
      password: e.detail.value
    })
    this._isEmpty()
  },

  duang (e) {
    var TEL_REGEXP = /(?:^1[3456789]|^9[28])\d{9}$/
    // 前端验证
    if (!TEL_REGEXP.test(this.data.phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.password !== this.data.key) {
      wx.showToast({
        title: '验证码有误',
        icon: 'none',
        duration: 2000
      })
      return
    }

    this._getUserInfo(e)
      .then(() => {
        wx.showLoading({
          title: '登录中',
          mask: true
        })
      })
      .then(() => {
        return logModel.log(this.data.phone, this.data.password)
      })
      // 保存token
      .then(res => {
        wx.setStorageSync('token', res.access_token)
      })
      // 保存电话号码
      .then(() => {
        wx.setStorageSync('phone', this.data.phone)
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/home/home'
        })
      })
      .catch(err => {
        wx.hideLoading()
        console.log('err:', err)
      })
  },

  getCode () {
    var TEL_REGEXP = /(?:^1[3456789]|^9[28])\d{9}$/
    // 前端验证
    if (!TEL_REGEXP.test(this.data.phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (!this.data.hadPost) {

      logModel.getKey(this.data.phone)
        .then(res => {
          console.log(res.body)
          if (!res.body) {
            return Promise.reject()
          }
          this.setData({
            key: res.body
          })
          this._timer()
        })
        .catch(() => {
          wx.showToast({
            title: '获取验证码失败',
            icon: 'none',
            duration: 2000
          })
        })
    }

  },

  _userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  _getUserInfo(e) {
    const userInfo = e.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
      return new Promise((resolve, reject) => {
        resolve()
      })
    } else {
      return new Promise ((resolve, reject) => {
        reject()
      })
    }
  },

  _isEmpty () {
    if (this.data.phone && this.data.password) {
      this.setData({
        isLegal: true
      })
    } else {
      this.setData({
        isLegal: false
      })
    }
  },

  _goHome () {
    const token = wx.getStorageSync('token')
    if (token) {
      wx.navigateTo({
        url: '/pages/home/home'
      })
    }
  },

  _timer () {
    this.setData({
      hadPost: true,
      interval: setInterval(() => {
        this.data.time = this.data.time - 1
        this.setData({
          time: this.data.time
        })
        if (this.data.time === 0) {
          clearInterval(this.data.interval)
          this.setData({
            time: 60,
            hadPost: false
          })
        }
      }, 1000)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})