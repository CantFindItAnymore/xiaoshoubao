// components/check/check-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkData: Array,
    hasData: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail (event) {
      this.triggerEvent('toDetail', {
        tid: event.detail.tid
      }, {})
    }
  }
})
