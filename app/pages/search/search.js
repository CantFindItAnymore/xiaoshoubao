import {
  ComponyModel
} from "../../api/models/compony"

const componyModel = new ComponyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    componyList: [
      // {
      //   name: 'google',
      //   hadAttestated: true,
      //   blance: 20000,
      //   registeTime: '2018-09-12',
      //   id: '0001'
      // },
      // {
      //   name: 'alibaba',
      //   hadAttestated: false,
      //   blance: 8000,
      //   registeTime: '2019-03-02',
      //   id: '0002'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '开通企业'
    })
    this._searchAll()
  },

  search (e) {
    const input = e.detail.input
    componyModel.getCompony(input)
      .then(res => {
        console.log(res.body)
        this.setData({
          componyList: res.body
        })
      })
  },

  delete() {
    if (!this.data.componyList.length) {
      this._searchAll()
    }
  },

  toSearchDetail (event) {
    const name = event.detail.name
    wx.navigateTo({
      url: '/pages/search-detail/search-detail?name=' + name
    })
  },

  _searchAll() {
    componyModel.getCompony()
      .then(res => {
        console.log(res.body)
        this.setData({
          componyList: res.body
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