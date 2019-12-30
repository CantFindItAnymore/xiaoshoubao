import {
  DrawModel
} from "../../api/models/draw"
const drawModel = new DrawModel()

import {
  HomeModel
} from "../../api/models/home"
const homeModel = new HomeModel()

import {
  promisic
} from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    isLegal: false,
    hadClick: false,
    drewNum: 0,
    logCode: '',
    encryptedData: '',
    iv: '',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提现'
    })
    homeModel.getHome()
      .then(res => {
        this.setData({
          data: res.body
        })
        wx.hideLoading()
      })
      .catch(() => {
        wx.hideLoading()
      })
  },

  toLegal () {
    this.setData({
      isLegal: true
    })
  },

  toIilegal () {
    this.setData({
      isLegal: false
    })
  },

  // 取现逻辑
  giveMeMoney (e) {
    wx.showLoading({
      title: '提现中',
      mask: true
    })
    this.setData({
      drewNum: e.detail.drawNum * 100 / 100
    })
    var that = this
    promisic(wx.login)()
      .then(res => {
        if (res.code) {
          that.setData({
            logCode: res.code
          })
          return promisic(wx.getUserInfo)()
        } else {
          reject('授权失败')
        }
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx23043ad4fd08de2e&secret=c840ba3388ffd1f977a20938575984af&js_code=' + this.data.logCode + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              console.log(res)
              var openid = res.data.openid
              if (openid) {
                resolve(openid)
              } else {
                reject('获取openid失败')
              }
            }
          })
        })
      })
      .then(res => {
        console.log(that.data.drewNum)
        console.log('res:', res)
        return drawModel.draw(that.data.drewNum, res)
      })
      .then(() => {
        wx.hideLoading()
        this.setData({
          hadClick: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  finished () {
    wx.navigateTo({
      url: '/pages/home/home'
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