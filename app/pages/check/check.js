import {
  BillModel
} from "../../api/models/bill"

const billModel = new BillModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecking: true,
    checkingData: [
      // {
      //   time: '2019-1-10',
      //   money: 1000,
      //   id: '1'
      // },
      // {
      //   time: '2019-1-11',
      //   money: 4000,
      //   id: '2'
      // },
      // {
      //   time: '2019-1-12',
      //   money: 3800,
      //   id: '3'
      // }
    ],
    checkedData: [
      // {
      //   time: '2017-11-09',
      //   money: 1300,
      //   id: '4'
      // },
      // {
      //   time: '2018-7-11',
      //   money: 42000,
      //   id: '5'
      // },
      // {
      //   time: '2018-12-12',
      //   money: 90000,
      //   id: '6'
      // },
      // {
      //   time: '2018-12-29',
      //   money: 1000,
      //   id: '7'
      // }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提成账单'
    })
    billModel.getBill(0)
      .then(res => {
        if (!res.body[0] || !res.body[0].billDetailsList) {
          return
        }
        res.body[0].billDetailsList && this.setData({
          checkingData: res.body[0].billDetailsList
        })
      })
    billModel.getBill(1)
      .then(res => {
        if (!res.body[0] || !res.body[0].billDetailsList) {
          return
        }
        var newArr = []
        for (const item of res.body) {
          newArr.push(item.billDetailsList)
        }
        res.body[0].billDetailsList && this.setData({
          checkedData: newArr
        })
      })
  },

  goChecking () {
    this.setData({
      isChecking: true
    })
  },

  goChecked () {
    this.setData({
      isChecking: false
    })
  },

  toDetail (event) {
    const tid = event.detail.tid
    console.log('chck:', tid)
    wx.navigateTo({
      url: '/pages/check-detail/check-detail?tid=' + tid
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