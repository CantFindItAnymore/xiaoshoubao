import {
  HomeModel
} from "../../api/models/home"
const homeModel = new HomeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: '../../imgs/default_head.png',
    mask: false,
    authorized: false,
    userInfo: null,
    data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this._userAuthorized()
    homeModel.getHome()
      .then(res => {
        this.setData({
          data: res.body
        })
        wx.hideLoading()
      })
      .catch(err => {
        console.log('token无效:', err)
        wx.hideLoading()
        // wx.navigateTo({
        //   url: '/pages/login/login'
        // })
      })
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

  call () {
    wx.makePhoneCall({
      phoneNumber: '028-63200326'
    })
  },

  goDraw () {
    if (this.data.data.canWithdraw === '0.00') {
      this.setData({
        mask: true
      })
      return
    }

    wx.navigateTo({
      url: '/pages/draw/draw'
    })
  },

  goHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    })
  },

  goCheck () {
    if (this.data.info) {
      this.setData({
        mask: true
      })
      return
    }

    wx.navigateTo({
      url: '/pages/check/check'
    })
  },

  goCompony () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  cancelMask () {
    this.setData({
      mask: false
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
  // onShow: function () {

  // },

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