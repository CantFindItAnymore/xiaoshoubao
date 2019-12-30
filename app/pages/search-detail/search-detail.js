import {
  ComponyModel
} from "../../api/models/compony"

const componyModel = new ComponyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {
      // name: 'alibaba',
      // blance: 2000.00,
      // total: 3000000.00,
      // registeTime: '2018-09-12 12:1',
      // attestationTime: '2018-09-12 12:1',
      // hadAttestated: false
    },
    hadIcon: '/imgs/had.png',
    yetIcon: '/imgs/yet.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '企业信息'
    })
    const name = options.name
    this.search(name)
  },

  search(name) {
    componyModel.getCompony(name)
      .then(res => {
        console.log(res.body)
        this.setData({
          detail: res.body[0]
        })
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