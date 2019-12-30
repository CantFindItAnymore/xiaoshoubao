// components/drawDetail/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canDrawNum: String,
    minNum: Number,
    maxNum: Number,
    notice: String,
    hadDrewToday: Number,
    isLegal: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    drawNum: '',
    delete: '../../imgs/delete.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change (e) {
      this.setData({
        drawNum: e.detail.value
      })
      if (this.data.drawNum * 100 >= this.properties.minNum && this.data.drawNum * 100 <= this.properties.maxNum) {
        this.triggerEvent('legal', {}, {})
      } else {
        this.triggerEvent('iilegal', {}, {})
      }

      if (this.data.drawNum.startsWith('0') && this.data.drawNum.charAt(1) !== '.' && this.data.drawNum.length >= 2) {
        this.setData({
          drawNum: this.data.drawNum.substr(1)
        })
      }

      if (this.data.drawNum.charAt(this.data.drawNum.length - 4) === '.') {
        var newNum = this.data.drawNum.slice(0, this.data.drawNum.length - 1)
        this.setData({
          drawNum: newNum
        })
      }
    },

    focus () {
      if (this.data.drawNum === '') {
        var defaultNum = this.properties.canDrawNum
        if (this.properties.maxNum && defaultNum > this.properties.maxNum) {
          defaultNum = this.properties.maxNum
        }
        this.setData({
          drawNum: defaultNum
        })
        this.triggerEvent('legal', {}, {})
      }
    },
    delete () {
      this.setData({
        drawNum: ''
      })
      this.triggerEvent('iilegal', {}, {})
    },
    duang() {
      console.log('今天可以提现不？', this.properties.hadDrewToday)
      if (this.properties.hadDrewToday !== 0) {
        wx.showToast({
          title: '今日已提现过一次，明天再来吧',
          icon: 'none',
          duration: 2000
        })
        return
      }

      this.triggerEvent('duang', {
        'drawNum': this.data.drawNum
      }, {})
    }
  }
})
