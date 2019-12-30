// components/check/mark/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    go: '/imgs/go.png'
    // cid: this.properties.id
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail () {
      var time = this.properties.checkData.rechargeTimeText.slice(0, 7)
      console.log(time)
      this.triggerEvent('toDetail', {
        tid: time
      }, {})
    }
  }
})
