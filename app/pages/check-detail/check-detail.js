import {
  BillModel
} from "../../api/models/bill"

const billModel = new BillModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailTime: '',
    filterData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '账单明细'
    })
    const tid = options.tid
    console.log(tid)
    this.setData({
      detailTime: tid
    })

    var newArr = []

    billModel.getBill(0)
      .then(res => {
        if (!res.body[0] || !res.body[0].billDetailsList) {
          return
        }
        for (const item of res.body) {
          newArr.push(item)
        }
      })
      .then(() => {
        return billModel.getBill(1)
      })
      .then(res => {
        if (!res.body[0] || !res.body[0].billDetailsList) {
          return
        }
        for (const item of res.body) {
          newArr.push(item)
        }
      })
      .then(() => {
        console.log(newArr)
        for (const item of newArr) {
          console.log(item.month.slice(0, 7), tid)
          if (item.month.slice(0, 7) === tid) {
            this.setData({
              filterData: item
            })
          }
        }
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