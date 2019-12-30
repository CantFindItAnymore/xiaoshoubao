import {
  HistoryModel
} from "../../api/models/history"

const historyModel = new HistoryModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [
      // {
      //   status: '处理中',
      //   time: '2018-08-12 12:16:56',
      //   money: 1200
      // },
      // {
      //   status: '成功',
      //   time: '2018-08-12 12:16:56',
      //   money: 1600
      // },
      // {
      //   status: '失败',
      //   time: '2018-08-12 12:16:56',
      //   money: 100
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提现记录'
    })
    historyModel.getHistory()
      .then(res => {
        console.log(res)
        this.setData({
          history: res.body
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